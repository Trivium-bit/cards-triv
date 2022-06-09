import {AppStoreType, AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";
import {setAppStatusAC} from "./app-reducer";
import {cardPacksAPI, PacksResponseType} from "../api/cardPacksAPI";

const SET_CARDS = "CARDS/SET_CARDS";
const SET_IS_LOADING_CARDS = "CARDS/IS_LOADING";
const SET_PERSONAL_CARDS_PACKS = "CARDS/SET_PERSONAL_CARDS_PACKS";
const INIT_ADD_NEW_CARD_PACK = "CARDS/INIT_ADD_NEW_CARD_PACK";
const ADD_NEW_CARD_PACK = "CARDS/ADD_NEW_CARD_PACK";
const SET_LOCAL_CARD_PACK_NAME = "CARDS/SET_LOCAL_CARD_PACK_NAME";
const SET_IS_MY_TABLE = "CARDS/SET_IS_MY_TABLE";
const SET_PACK_CARD_COUNT = "CARDS/SET_PACK_CARD_COUNT";
const EDIT_CARD_PACK_NAME = "CARDS/EDIT_CARD_PACK_NAME"

export type CardPackRequestType = {
    name: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}
export type AddNewCardPackType = {
    isLoading: boolean,
    success?: boolean;
    error?: string;
}

export type PacksPaginationType = {
    current: number,
    count: number
}
export type InitialProfileStateType = {
    isLoading: boolean;
    cardsPacks: PacksResponseType[];
    pagination: PacksPaginationType;
    addNewCardPack: AddNewCardPackType;
    cardPacksTotalCount: number,
    searchPackName: string,
    isMyTable: boolean,
    pageCount: number,
    page: number,
    sortPacks: string,
    packName: string,
    min: number,
    max: number,
    newCardPackName: string
}
const initialState: InitialProfileStateType = {
    isLoading: false,
    cardsPacks: [],
    pagination: {
        count: 0,
        current: 0
    },
    addNewCardPack: {
        isLoading: false,
        success: undefined,
        error: undefined
    },
    cardPacksTotalCount: 0,
    searchPackName: "",
    newCardPackName: "",
    min: 0,
    max: 112,
    isMyTable: true,
    pageCount: 8,
    page: 0,
    sortPacks: "",
    packName: ""
}
export type CardsPacksActionType = SetCardsActionType
    /*| SetCardsIsLoadingActionType*/
    | setInitAddNewCardsPackActionType
    | AddNewCardsPackActionType
    | SetLocalCardPackNameType
    | SetIsMyTableType
    | SetPacksCardCountType
    | EditCardsPackActionType

export const cardPacksReducer = (state: InitialProfileStateType = initialState, action: CardsPacksActionType): InitialProfileStateType => {
    switch (action.type) {
        /*case SET_IS_LOADING_CARDS:
            return {...state, isLoading: action.isLoading}*/
        case SET_CARDS:
            return {...state, cardsPacks: action.cardsPacks, pagination: action.pagination}
        case INIT_ADD_NEW_CARD_PACK:
            return {...state, addNewCardPack: {...state.addNewCardPack, isLoading: action.isLoading}}
        case ADD_NEW_CARD_PACK:
            return {
                ...state,
                cardsPacks: [action.pack, ...state.cardsPacks],
                addNewCardPack: {
                    ...state.addNewCardPack, success: true
                }
            }
        case SET_LOCAL_CARD_PACK_NAME:
            return {...state, searchPackName: action.searchPackName}
        case SET_IS_MY_TABLE:
            return {...state, isMyTable: action.isMyTable}
        case SET_PACK_CARD_COUNT:
            return {...state, min: action.min, max: action.max}
        case EDIT_CARD_PACK_NAME:
            return {...state, newCardPackName: action.newPackName}
        default:
            return state
    }
}

// actions
export const setCardsIsLoadingAC = (isLoading: boolean) => ({type: SET_IS_LOADING_CARDS, isLoading} as const)
export const setCardsAC = (cardsPacks: PacksResponseType[], pagination: PacksPaginationType) => ({
    type: SET_CARDS,
    cardsPacks,
    pagination
} as const);
export const setPersonalCardsPacksAC = (cardsPacks: PacksResponseType[], user_id: string, pagination: PacksPaginationType) => ({
    type: SET_PERSONAL_CARDS_PACKS,
    cardsPacks,
    user_id,
    pagination,
} as const);
export const setInitAddNewCardPackAC = (isLoading: boolean) => ({type: INIT_ADD_NEW_CARD_PACK, isLoading} as const);
export const AddNewCardPackAC = (pack: PacksResponseType) => ({type: ADD_NEW_CARD_PACK, pack} as const);
export const setLocalCardPackNameAC = (searchPackName: string) => ({
    type: SET_LOCAL_CARD_PACK_NAME,
    searchPackName
} as const);
export const setIsMyTableAC = (isMyTable: boolean) => ({type: SET_IS_MY_TABLE, isMyTable} as const);
export const setPacksCardsCountAC = (min: number, max: number) => ({type: SET_PACK_CARD_COUNT, min, max} as const);
export const editCardPackAC = (newPackName: string) => ({type: EDIT_CARD_PACK_NAME, newPackName} as const)

// types
/*export type SetCardsIsLoadingActionType = ReturnType<typeof setCardsIsLoadingAC>;*/
export type SetCardsActionType = ReturnType<typeof setCardsAC>;
export type setInitAddNewCardsPackActionType = ReturnType<typeof setInitAddNewCardPackAC>;
export type AddNewCardsPackActionType = ReturnType<typeof AddNewCardPackAC>;
export type SetLocalCardPackNameType = ReturnType<typeof setLocalCardPackNameAC>;
export type SetIsMyTableType = ReturnType<typeof setIsMyTableAC>;
export type SetPacksCardCountType = ReturnType<typeof setPacksCardsCountAC>;
export type EditCardsPackActionType = ReturnType<typeof editCardPackAC>;

//thunks
export const getCardsPacksTC = (isMyTable: boolean, page: number, packName?: string, min?: number, max?: number) => (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const user_id = getState().appReducer.user._id;
    const {pageCount, isMyTable} = getState().cardsPacksReducer;
    dispatch(setAppStatusAC("loading"));

    cardPacksAPI.getCardsPacks(isMyTable ? {page, user_id, pageCount, packName, min, max} : {
        page,
        pageCount,
        packName,
        min,
        max
    })
        .then((res) => {
            const countPagesNumber = () => {
                return Math.ceil(res.data.cardPacksTotalCount / res.data.pageCount)
            }
            dispatch(setCardsAC(res.data.cardPacks, {count: countPagesNumber(), current: res.data.page}));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

export const addNewCardPackTC = (pack: CardPackRequestType, callback: () => void, currentPage: number) => (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const isMyTable = getState().cardsPacksReducer.isMyTable;

    dispatch(setAppStatusAC("loading"));
    cardPacksAPI.addPack(pack)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"));
            callback();
            dispatch(getCardsPacksTC(isMyTable, currentPage))

        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

export const deleteCardPackTC = (id: string, page:number) => (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const {isMyTable} = getState().cardsPacksReducer;
    dispatch(setAppStatusAC("loading"));
    cardPacksAPI.deleteMyCardsPacks(id)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(getCardsPacksTC(isMyTable, page))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

export const editMyCardsPacksTC = (_id: string, name: string, page:number) => (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const {isMyTable} = getState().cardsPacksReducer;
    dispatch(setAppStatusAC("loading"));
    cardPacksAPI.editMyCardsPacks(_id, name)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(getCardsPacksTC(isMyTable, page))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}




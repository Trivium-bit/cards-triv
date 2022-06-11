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
const EDIT_CARD_PACK_NAME = "CARDS/EDIT_CARD_PACK_NAME";
const SET_CARDS_PACKS_SORT_VALUE = "SET_CARDS_PACKS_SORT_VALUE";

export type CardPackRequestType = {
    name: string
    path?: string
    grade?: number //средняя оценка карточек
    shots?: number //колличество попыток ответить
    rating?: number //лайки
    deckCover?: string //обложка колоды
    private?: boolean
    type?: string
}
export type CardPackUpdateRequestType = {
    _id:string
} & CardPackRequestType


export type PacksPaginationType = {
    current: number,
    count: number
}
export type InitialProfileStateType = {
    isLoading: boolean;
    cardsPacks: PacksResponseType[];
    pagination: PacksPaginationType;
    cardPacksTotalCount: number,
    isMyTable: boolean,
    pageCount: number,
    page: number,
    packName: string,
    min: number,
    max: number,
    newCardPackName: string,
    sortPacks: string,

}
const initialState: InitialProfileStateType = {
    isLoading: false,
    cardsPacks: [],
    pagination: {
        count: 0,
        current: 0
    },
    cardPacksTotalCount: 0,
    newCardPackName: "",
    min: 0,
    max: 150,
    isMyTable: true,
    pageCount: 8,
    page: 0,
    packName: "",
    sortPacks: "0updated",

}
export type CardsPacksActionType = SetCardsActionType
    | setInitAddNewCardsPackActionType
    | AddNewCardsPackActionType
    | SetLocalCardPackNameType
    | SetIsMyTableType
    | SetPacksCardCountType
    | EditCardsPackActionType
    | SortCardsPackByDateActionType

export const cardPacksReducer = (state: InitialProfileStateType = initialState, action: CardsPacksActionType): InitialProfileStateType => {
    switch (action.type) {
        case SET_CARDS:
            return {...state, cardsPacks: action.cardsPacks, pagination: action.pagination}
        case ADD_NEW_CARD_PACK:
            return {...state, cardsPacks: [action.pack, ...state.cardsPacks]}
        case SET_LOCAL_CARD_PACK_NAME:
            return {...state, packName: action.packName}
        case SET_IS_MY_TABLE:
            return {...state, isMyTable: action.isMyTable}
        case SET_PACK_CARD_COUNT:
            return {...state, min: action.min, max: action.max}
        case EDIT_CARD_PACK_NAME:
            return {...state, newCardPackName: action.newPackName}
        case SET_CARDS_PACKS_SORT_VALUE:
            return {...state, sortPacks:action.sortPacks}
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
export const setLocalCardPackNameAC = (packName: string) => ({type: SET_LOCAL_CARD_PACK_NAME, packName} as const);
export const setIsMyTableAC = (isMyTable: boolean) => ({type: SET_IS_MY_TABLE, isMyTable} as const);
export const setPacksCardsCountAC = (min: number, max: number) => ({type: SET_PACK_CARD_COUNT, min, max} as const);
export const editCardPackAC = (newPackName: string) => ({type: EDIT_CARD_PACK_NAME, newPackName} as const)
export const changeSortPacksAC = (sortPacks: string,) => ({type: SET_CARDS_PACKS_SORT_VALUE, sortPacks} as const)

// types
/*export type SetCardsIsLoadingActionType = ReturnType<typeof setCardsIsLoadingAC>;*/
export type SetCardsActionType = ReturnType<typeof setCardsAC>;
export type setInitAddNewCardsPackActionType = ReturnType<typeof setInitAddNewCardPackAC>;
export type AddNewCardsPackActionType = ReturnType<typeof AddNewCardPackAC>;
export type SetLocalCardPackNameType = ReturnType<typeof setLocalCardPackNameAC>;
export type SetIsMyTableType = ReturnType<typeof setIsMyTableAC>;
export type SetPacksCardCountType = ReturnType<typeof setPacksCardsCountAC>;
export type EditCardsPackActionType = ReturnType<typeof editCardPackAC>;
export type SortCardsPackByDateActionType = ReturnType<typeof changeSortPacksAC>;

//thunks
export const getCardsPacksTC = (page: number) => (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const user_id = getState().appReducer.user._id;
    const {pageCount, isMyTable, packName, min, max, sortPacks} = getState().cardPacksReducer;
    dispatch(setAppStatusAC("loading"));

    cardPacksAPI.getCardsPacks(isMyTable ? {page, user_id, pageCount, packName, min, max, sortPacks} : {
        page,
        pageCount,
        packName,
        min,
        max,
        sortPacks
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

export const addNewCardPackTC = (pack: CardPackRequestType, currentPage: number) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardPacksAPI.addPack(pack)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"));

            dispatch(getCardsPacksTC(currentPage) )

        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

export const deleteCardPackTC = (id: string, currentPage:number) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardPacksAPI.deleteMyCardsPacks(id)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(getCardsPacksTC(currentPage))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

export const editMyCardsPacksTC = (pack: CardPackUpdateRequestType, currentPage:number) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardPacksAPI.editMyCardsPacks(pack)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(getCardsPacksTC(currentPage))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

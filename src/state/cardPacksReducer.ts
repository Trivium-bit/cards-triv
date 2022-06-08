
import {AppStoreType, AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";
import {setAppStatusAC} from "./app-reducer";
import {cardsAPI, PacksResponseType} from "../api/cardsAPI";

const SET_CARDS = "CARDS/SET_CARDS";
const SET_IS_LOADING_CARDS = "CARDS/IS_LOADING";
const SET_PERSONAL_CARDS_PACKS = "CARDS/SET_PERSONAL_CARDS_PACKS";
const INIT_ADD_NEW_CARD_PACK = "CARDS/INIT_ADD_NEW_CARD_PACK";
const ADD_NEW_CARD_PACK = "CARDS/ADD_NEW_CARD_PACK";
const SET_LOCAL_CARD_PACK_NAME = "CARDS/SET_LOCAL_CARD_PACK_NAME";
const SET_IS_MY_TABLE = "CARDS/SET_IS_MY_TABLE";
const SET_PACK_CARD_COUNT = "CARDS/SET_PACK_CARD_COUNT";
const SORT_PACKS_BY_CARD_COUNT = "CARDS/SORT_PACKS_BY_CARD_COUNT";


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
    localPackName: string,
    sliderValues: number[],
    isMyTable: boolean
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
    localPackName: "",
    sliderValues:[0, 112],
    isMyTable: true,
}
export type CardsActionType = SetCardsActionType
    /*| SetCardsIsLoadingActionType*/
    | SetPersonalCardsPacksActionType
    | setInitAddNewCardsPackActionType
    | AddNewCardsPackActionType
    | SetLocalCardPackNameType
    | SetIsMyTableType
    | SetPacksCardCountType
    | SortPacksByCardCountType

export const cardPacksReducer = (state: InitialProfileStateType = initialState, action: CardsActionType): InitialProfileStateType => {
    switch (action.type) {
        /*case SET_IS_LOADING_CARDS:
            return {...state, isLoading: action.isLoading}*/
        case SET_CARDS:
            return {...state, cardsPacks: action.cardsPacks, pagination: action.pagination}
        case SET_PERSONAL_CARDS_PACKS:
            return {
                ...state, cardsPacks: action.cardsPacks.filter(cardsPack => cardsPack.user_id === action.user_id),
                pagination: action.pagination,
            }
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
            return {...state, localPackName:action.localPackName}
        case SET_IS_MY_TABLE:
            return {...state, isMyTable:action.isMyTable}
        case SET_PACK_CARD_COUNT:
            return {...state, sliderValues: action.sliderValues}

        case SORT_PACKS_BY_CARD_COUNT:
            return {...state, cardsPacks:action.cardsPacks, pagination: action.pagination}

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
export const setLocalCardPackNameAC = (localPackName: string) => ({type: SET_LOCAL_CARD_PACK_NAME, localPackName} as const);
export const setIsMyTableAC = (isMyTable: boolean) => ({type: SET_IS_MY_TABLE, isMyTable} as const);
export const setPacksCardsCountAC = (sliderValues: Array<number>) => ({type: SET_PACK_CARD_COUNT, sliderValues} as const);
export const sortPacksByCardsCountAC = (cardsPacks:PacksResponseType[], pagination: PacksPaginationType) => ({type: SORT_PACKS_BY_CARD_COUNT, cardsPacks, pagination} as const);

// types
/*export type SetCardsIsLoadingActionType = ReturnType<typeof setCardsIsLoadingAC>;*/
export type SetCardsActionType = ReturnType<typeof setCardsAC>;
export type SetPersonalCardsPacksActionType = ReturnType<typeof setPersonalCardsPacksAC>;
export type setInitAddNewCardsPackActionType = ReturnType<typeof setInitAddNewCardPackAC>;
export type AddNewCardsPackActionType = ReturnType<typeof AddNewCardPackAC>;
export type SetLocalCardPackNameType = ReturnType<typeof setLocalCardPackNameAC>;
export type SetIsMyTableType = ReturnType<typeof setIsMyTableAC>;
export type SetPacksCardCountType = ReturnType<typeof setPacksCardsCountAC>;
export type SortPacksByCardCountType = ReturnType<typeof sortPacksByCardsCountAC>;

//thunk get all packs
export const getAllCardsPacksTC = (isMyTable: boolean, page: number) => (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const user_id = getState().appReducer.user._id

    dispatch(setAppStatusAC("loading"));

    cardsAPI.getCardsPacks( isMyTable ? {page, user_id} : {page})
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

export const addNewCardPackTC = (pack: CardPackRequestType, callback: () => void, currentPage:number) =>(dispatch:AppThunkDispatch, getState: () => AppStoreType) =>{
    const isMyTable = getState().cardsReducer.isMyTable;

    dispatch(setAppStatusAC("loading"));
    cardsAPI.addPack(pack)
        .then(() =>{
            dispatch(setAppStatusAC("succeeded"));
            callback();

            dispatch(getAllCardsPacksTC( isMyTable,currentPage))

        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}
//thunk delete pack
export const deleteCardPackTC = (id: string, callback: () => void) =>(dispatch:AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI.deleteMyCardsPacks(id)
        .then(() =>{
            dispatch(setAppStatusAC("succeeded"));
            callback()
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}
//thunk find pack
export const findPackTC = (packName: string) => (dispatch:AppThunkDispatch, getState: () => AppStoreType) =>{
    const isMyTable = getState().cardsReducer.isMyTable;
    const user_id = getState().appReducer.user._id
    dispatch(setAppStatusAC("loading"));

    cardsAPI.getCardsPacks(isMyTable ? {packName, user_id} : {packName})
        .then((res)=>{
            dispatch(setAppStatusAC("succeeded"));
            const countPagesNumber = () => {
                return Math.ceil(res.data.cardPacksTotalCount / res.data.pageCount)
            }
            dispatch(setCardsAC(res.data.cardPacks, {count: countPagesNumber(), current: res.data.page}));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch);
            }
        )
}

export const sortPacksByNumberTC = (arrOfNumbers:Array<number>, page: number) => (dispatch:AppThunkDispatch, getState: () => AppStoreType) =>{
    const isMyTable = getState().cardsReducer.isMyTable;
    const user_id = getState().appReducer.user._id;
    dispatch(setAppStatusAC("loading"));
    const min = arrOfNumbers[0];
    const max = arrOfNumbers[1];

    cardsAPI.getCardsPacks(isMyTable ? {min, max, user_id, page} : {min, max, page})
        .then((res)=>{
            const countPagesNumber = () => {
                return Math.ceil(res.data.cardPacksTotalCount / res.data.pageCount)
            }
            dispatch(setAppStatusAC("succeeded"));
            dispatch(sortPacksByCardsCountAC(res.data.cardPacks, {count: countPagesNumber(), current: res.data.page}))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch);
        }
    )
}




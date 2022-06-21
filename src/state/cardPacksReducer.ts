import {AppStoreType, AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";
import {setAppStatusAC} from "./app-reducer";
import {cardPacksAPI, PacksResponseType} from "../api/cardPacksAPI";

const SET_CARDS = "CARDS/SET_CARDS";
const INIT_ADD_NEW_CARD_PACK = "CARDS/INIT_ADD_NEW_CARD_PACK";
const ADD_NEW_CARD_PACK = "CARDS/ADD_NEW_CARD_PACK";
const SET_LOCAL_CARD_PACK_NAME = "CARDS/SET_LOCAL_CARD_PACK_NAME";
const SET_IS_MY_TABLE = "CARDS/SET_IS_MY_TABLE";
const SET_PACK_CARD_COUNT = "CARDS/SET_PACK_CARD_COUNT";
const EDIT_CARD_PACK_NAME = "CARDS/EDIT_CARD_PACK_NAME";
const SET_CARDS_PACKS_SORT_VALUE = "CARDS/SET_CARDS_PACKS_SORT_VALUE";
const SET_IS_PRIVATE_CARD_PACK = "CARDS/SET_IS_PRIVATE_CARD_PACK";
const SET_CURRENT_PAGE = "CARDS/SET_CURRENT_PAGE";

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
    _id: string
} & CardPackRequestType

export type InitialProfileStateType = {
    isLoading: boolean;
    cardsPacks: PacksResponseType[];
    cardPacksTotalCount: number,
    isMyTable: boolean,
    pageCount: number,
    page: number,
    packName: string,
    min: number,
    max: number,
    newCardPackName: string,
    sortPacks: string,
    isPrivate: boolean

}
const initialState: InitialProfileStateType = {
    isLoading: false,
    cardsPacks: [],
    cardPacksTotalCount: 0,
    newCardPackName: "",
    min: 0,
    max: 111,
    isMyTable: false,
    pageCount: 8,
    page: 1,
    packName: "",
    sortPacks: "0updated",
    isPrivate: false
}
export type CardsPacksActionType = SetCardsActionType
    | AddNewCardsPackActionType
    | SetLocalCardPackNameType
    | SetIsMyTableType
    | SetPacksCardCountType
    | EditCardsPackActionType
    | SortCardsPackByDateActionType
    | SetIsPrivateCardPackActionType
    | SetCardPackCurrentPageActionType

export const cardPacksReducer = (state: InitialProfileStateType = initialState, action: CardsPacksActionType): InitialProfileStateType => {
    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                cardsPacks: action.cardsPacks,
                cardPacksTotalCount: action.cardPacksTotalCount,
                page: action.page
            }
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
            return {...state, sortPacks: action.sortPacks}
        case SET_IS_PRIVATE_CARD_PACK:
            return {...state, isPrivate: action.isPrivate}
        case SET_CURRENT_PAGE:
            return {...state, page: action.page}
        default:
            return state
    }
}

// actions
export const setCardsAC = (cardsPacks: PacksResponseType[], cardPacksTotalCount: number, page: number) => ({
    type: SET_CARDS, cardsPacks, cardPacksTotalCount, page
} as const);
export const setInitAddNewCardPackAC = (isLoading: boolean) => ({type: INIT_ADD_NEW_CARD_PACK, isLoading} as const);
export const AddNewCardPackAC = (pack: PacksResponseType) => ({type: ADD_NEW_CARD_PACK, pack} as const);
export const setLocalCardPackNameAC = (packName: string) => ({type: SET_LOCAL_CARD_PACK_NAME, packName} as const);
export const setIsMyTableAC = (isMyTable: boolean) => ({type: SET_IS_MY_TABLE, isMyTable} as const);
export const setPacksCardsCountAC = (min: number, max: number) => ({type: SET_PACK_CARD_COUNT, min, max} as const);
export const editCardPackAC = (newPackName: string) => ({type: EDIT_CARD_PACK_NAME, newPackName} as const)
export const sortPacksAC = (sortPacks: string) => ({type: SET_CARDS_PACKS_SORT_VALUE, sortPacks} as const)
export const setIsPrivateCardPackAC = (isPrivate: boolean) => ({type: SET_IS_PRIVATE_CARD_PACK, isPrivate} as const);
export const setCardPackCurrentPageAC = (page: number) => ({type: SET_CURRENT_PAGE, page} as const);

// types
export type SetCardsActionType = ReturnType<typeof setCardsAC>;
export type AddNewCardsPackActionType = ReturnType<typeof AddNewCardPackAC>;
export type SetLocalCardPackNameType = ReturnType<typeof setLocalCardPackNameAC>;
export type SetIsMyTableType = ReturnType<typeof setIsMyTableAC>;
export type SetPacksCardCountType = ReturnType<typeof setPacksCardsCountAC>;
export type EditCardsPackActionType = ReturnType<typeof editCardPackAC>;
export type SortCardsPackByDateActionType = ReturnType<typeof sortPacksAC>;
export type SetIsPrivateCardPackActionType = ReturnType<typeof setIsPrivateCardPackAC>;
export type SetCardPackCurrentPageActionType = ReturnType<typeof setCardPackCurrentPageAC>;

//thunks
export const getCardsPacksTC = () => (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const user_id = getState().appReducer.user._id;
    const {pageCount, isMyTable, packName, min, max, sortPacks, page} = getState().cardPacksReducer;
    dispatch(setAppStatusAC("loading"));

    cardPacksAPI.getCardsPacks(isMyTable
        ? {user_id, page, pageCount, packName, min, max, sortPacks}
        : {page, pageCount, packName, min, max, sortPacks})
        .then((res) => {
            const currentPagesCount = Math.ceil(res.data.cardPacksTotalCount / res.data.pageCount)
            dispatch(setCardsAC(res.data.cardPacks, currentPagesCount, res.data.page));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

export const addNewCardPackTC = (pack: CardPackRequestType) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardPacksAPI.addPack(pack)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(getCardsPacksTC())
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

export const deleteCardPackTC = (id: string) => (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const {page, cardsPacks} = getState().cardPacksReducer;
    dispatch(setAppStatusAC("loading"));
    cardPacksAPI.deleteMyCardsPacks(id)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"));
            if(cardsPacks.length === 1 && page > 1){
                dispatch(setCardPackCurrentPageAC(page - 1))
            }
            dispatch(getCardsPacksTC())
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

export const editMyCardsPacksTC = (pack: CardPackUpdateRequestType) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardPacksAPI.editMyCardsPacks(pack)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(getCardsPacksTC())
            dispatch(setCardPackCurrentPageAC(  1))

        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

import {AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "./app-reducer";
import {cardApi, PackCardType} from "../api/cardAPI";
import {handleNetworkError} from "../utils/error.utils";

const SET_PACK_CARDS = "PACK_CARDS/SET_PACK_CARDS"

export type PaginationCardType = {
    current: number,
    count: number
}

export type InitialCardsStateType = {
    cards: PackCardType[]
    pagination: PaginationCardType
}
const initialState: InitialCardsStateType = {
    cards: [],
    pagination: {
        count: 0,
        current: 0
    }
}

//reducer
export const cardsReducer = (state: InitialCardsStateType = initialState, action: CardActionType): InitialCardsStateType => {
    switch (action.type) {
        case SET_PACK_CARDS:
            return {...state, cards: action.cards, pagination: action.pagination}
        default:
            return state
    }
}
//AC
export const setPackCardsAC = (cards:PackCardType[],pagination: PaginationCardType) => ({type: SET_PACK_CARDS, cards, pagination} as const)

//AC TYPES
export type getPackCardsActionType = ReturnType<typeof setPackCardsAC>;

//main AC type
export type CardActionType = getPackCardsActionType

//get card thunk
export const getCardsTC = (id: string, currentPage: string) =>(dispatch:AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardApi.getAllCards(id, currentPage)
        .then((res) =>{
            dispatch(setPackCardsAC(res.data.cards, {
                count: Math.ceil(res.data.cardsTotalCount / res.data.pageCount),
                current:res.data.page
            }));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}
//add card thunk
export const addNewCardTC = (id: string, card: PackCardType,callback: () => void) =>(dispatch:AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardApi.addNewCard(id, card)
        .then(() =>{
            dispatch(setAppStatusAC("succeeded"));
            callback();
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}
//thunk delete card
export const deleteCardTC = (id: string, callback: () => void) =>(dispatch:AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardApi.deleteMyCard(id)
        .then(() =>{
            dispatch(setAppStatusAC("succeeded"));
            callback();
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}
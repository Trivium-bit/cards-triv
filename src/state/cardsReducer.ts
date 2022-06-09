import {AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "./app-reducer";
import {cardApi, PackCardType} from "../api/cardAPI";
import {handleNetworkError} from "../utils/error.utils";

const SET_PACK_CARDS = "PACK_CARDS/SET_PACK_CARDS"


const initialState: InitialCardsStateType = {
    cards: [],
}
export type InitialCardsStateType = {
    cards: PackCardType[]
}

//main AC type
export type CardActionType = getPackCardsActionType

//reducer
export const cardsReducer = (state: InitialCardsStateType = initialState, action: CardActionType): InitialCardsStateType => {
    switch (action.type) {
        case SET_PACK_CARDS:
            return {...state, cards: action.cards}
        default:
            return state
    }
}
//AC
export const setPackCardsAC = (cards:PackCardType[]) => ({type: SET_PACK_CARDS, cards} as const)


//AC TYPES
export type getPackCardsActionType = ReturnType<typeof setPackCardsAC>;

//get card thunk
export const getCardsTC = (id: string) =>(dispatch:AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardApi.getAllCards(id)
        .then((res) =>{
            dispatch(setAppStatusAC("succeeded"));
            dispatch(setPackCardsAC(res.data.cards));
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
            callback()
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}
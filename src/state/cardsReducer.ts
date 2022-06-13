import {AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "./app-reducer";
import {cardApi, GetCardsParams, PackCardType} from "../api/cardAPI";
import {handleNetworkError} from "../utils/error.utils";

const SET_PACK_CARDS = "PACK_CARDS/SET_PACK_CARDS"
const FILTER_ANSWER = "PACK_CARDS/FILTER_ANSWER"
const FILTER_QUESTION = "PACK_CARDS/FILTER_QUESTION"

export type PaginationCardType = {
    current: number,
    count: number
}

export type InitialCardsStateType = {
    cards: PackCardType[]
    pagination: PaginationCardType
    answer: string
    question: string
}
const initialState: InitialCardsStateType = {
    cards: [],
    pagination: {
        count: 0,
        current: 0
    },
    answer: '',
    question: ''
}

//reducer
export const cardsReducer = (state: InitialCardsStateType = initialState, action: CardActionType): InitialCardsStateType => {
    switch (action.type) {
        case SET_PACK_CARDS:
            return {...state, cards: action.cards, pagination: action.pagination}
        case FILTER_ANSWER:
            return {...state, answer: action.answer}
        case FILTER_QUESTION:
            return {...state, question: action.question}
        default:
            return state
    }
}
//AC
export const setPackCardsAC = (cards:PackCardType[],pagination: PaginationCardType) => ({type: SET_PACK_CARDS, cards, pagination} as const)
export const setFilterQuestionAC = (question: string) => ({type: FILTER_QUESTION, question} as const)
export const setFilterAnswerAC = (answer:string) => ({type: FILTER_ANSWER, answer} as const)

//AC TYPES
export type getPackCardsActionType = ReturnType<typeof setPackCardsAC>;
export type setFilterQuestionActionType = ReturnType<typeof setFilterQuestionAC>;
export type setFilterAnswersActionType = ReturnType<typeof setFilterAnswerAC>;

//main AC type
export type CardActionType = getPackCardsActionType | setFilterQuestionActionType | setFilterAnswersActionType


//get card thunk
export const getCardsTC = (payload: GetCardsParams) =>(dispatch:AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardApi.getAllCards(payload)
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
//edit Thunk
export const editCardTC = (_id: string, question:string, answer:string, callback: () => void) =>(dispatch:AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardApi.editMyCard(_id,question,answer)
        .then(() =>{
            dispatch(setAppStatusAC("succeeded"));
            callback();
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}

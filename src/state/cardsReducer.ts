import {AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "./app-reducer";
import {cardApi, GetCardsParams, PackCardType} from "../api/cardAPI";
import {handleNetworkError} from "../utils/error.utils";

const SET_PACK_CARDS = "PACK_CARDS/SET_PACK_CARDS"
const FILTER_ANSWER = "PACK_CARDS/FILTER_ANSWER"
const FILTER_QUESTION = "PACK_CARDS/FILTER_QUESTION"
const CHANGE_GRADE = "PACK_CARDS/CHANGE_GRADE"

export type PaginationCardType = {
    current: number,
    count: number
}

export type InitialCardsStateType = {
    cards: PackCardType[]
    pagination: PaginationCardType
    answer: string
    question: string
    grade: number | undefined
}
const initialState: InitialCardsStateType = {
    cards: [],
    pagination: {
        count: 0,
        current: 0
    },
    answer: '',
    question: '',
    grade: undefined
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
        case CHANGE_GRADE:
            return {...state, grade: action.grade}
        default:
            return state
    }
}
//AC
export const setPackCardsAC = (cards:PackCardType[],pagination: PaginationCardType) => ({type: SET_PACK_CARDS, cards, pagination} as const)
export const setFilterQuestionAC = (question: string) => ({type: FILTER_QUESTION, question} as const)
export const setFilterAnswerAC = (answer:string) => ({type: FILTER_ANSWER, answer} as const)
export const changeGradeAC = (grade: number | undefined) => ({type: CHANGE_GRADE, grade} as const)

//AC TYPES
export type getPackCardsActionType = ReturnType<typeof setPackCardsAC>;
export type setFilterQuestionActionType = ReturnType<typeof setFilterQuestionAC>;
export type setFilterAnswersActionType = ReturnType<typeof setFilterAnswerAC>;
export type changeGradeActionType = ReturnType<typeof changeGradeAC>;

//main AC type
export type CardActionType = getPackCardsActionType | setFilterQuestionActionType | setFilterAnswersActionType | changeGradeActionType


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
//
export const changeGradeTC = (grade: number | undefined, card_id: string) =>(dispatch:AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardApi.gradeMyCard(grade, card_id)
        .then((res) =>{
            dispatch(setAppStatusAC("succeeded"));
            const grade = res.data.updatedCard.grade
            dispatch(changeGradeAC(grade))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}

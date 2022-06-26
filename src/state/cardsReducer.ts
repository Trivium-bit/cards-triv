import {AppStoreType, AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "./app-reducer";
import {cardApi, GetCardsParams, PackCardPayloadType, PackCardType, updatedCardType} from "../api/cardAPI";
import {handleNetworkError} from "../utils/error.utils";

const SET_PACK_CARDS = "PACK_CARDS/SET_PACK_CARDS"
const FILTER_ANSWER = "PACK_CARDS/FILTER_ANSWER"
const FILTER_QUESTION = "PACK_CARDS/FILTER_QUESTION"
const SET_LOCAL_CARD_GRADE = "PACK_CARDS/SET_LOCAL_CARD_GRADE"
const UPDATE_CARD = "PACK_CARDS/UPDATE_CARD"


export type PaginationCardType = {
    current: number,
    count: number
}
export type LocalCardDataType = {
    answer: string,
    question: string,
    questionImg: string,
    answerImg: string,
}
export type InitialCardsStateType = {
    cards: PackCardType[]
    pagination: PaginationCardType
    answer: string
    question: string
    localCardGrade: number
    pageCount: number
    localCardData: LocalCardDataType

}
const initialState: InitialCardsStateType = {
    cards: [],
    pagination: {
        count: 0,
        current: 0
    },
    answer: '',
    question: '',
    localCardGrade: 0,
    pageCount: 8,
    localCardData: {
        answer: "",
        question: "",
        questionImg: "",
        answerImg: "",
    }

}

//reducer
export const cardsReducer = (state: InitialCardsStateType = initialState, action: CardActionType): InitialCardsStateType => {
    switch (action.type) {
        case SET_PACK_CARDS:
            return {...state, cards: action.cards, pagination: action.pagination}
       /* case FILTER_ANSWER:
            return {...state, answer: action.answer}
        case FILTER_QUESTION:
            return {...state, question: action.question}*/
        case SET_LOCAL_CARD_GRADE:
            return {...state, localCardGrade: action.localCardGrade}
        case UPDATE_CARD:
            return {
                ...state, cards: state.cards.map(card =>
                            card._id === action.updatedCard.card_id
                            ? {...card, grade: action.updatedCard.grade, shots:action.updatedCard.shots,
                                    questionImg:action.updatedCard.questionImg, answerImg:action.updatedCard.answerImg}
                            : card
                )
            }

        default:
            return state
    }
}
//AC
export const setPackCardsAC = (cards:PackCardType[],pagination: PaginationCardType) => ({type: SET_PACK_CARDS, cards, pagination} as const)
export const setFilterQuestionAC = (question: string) => ({type: FILTER_QUESTION, question} as const)
export const setFilterAnswerAC = (answer:string) => ({type: FILTER_ANSWER, answer} as const)
export const saveLocalCardGradeAC = (localCardGrade:number) => ({type: SET_LOCAL_CARD_GRADE, localCardGrade} as const)
export const updateCardAC = (updatedCard: updatedCardType) => ({type: UPDATE_CARD, updatedCard} as const)


//AC TYPES
export type getPackCardsActionType = ReturnType<typeof setPackCardsAC>;
export type setFilterQuestionActionType = ReturnType<typeof setFilterQuestionAC>;
export type setFilterAnswersActionType = ReturnType<typeof setFilterAnswerAC>;
export type saveLocalCardGradeActionType = ReturnType<typeof saveLocalCardGradeAC>;
export type setNewCardGradeActionType = ReturnType<typeof updateCardAC>;



//main AC type
export type CardActionType = getPackCardsActionType
    | setFilterQuestionActionType
    | setFilterAnswersActionType
    | saveLocalCardGradeActionType
    | setNewCardGradeActionType



//get card thunk
export const getCardsTC = (payload: GetCardsParams) =>(dispatch:AppThunkDispatch,  getState: () => AppStoreType) => {
    const pageCount = getState().cardsReducer.pageCount;
    dispatch(setAppStatusAC("loading"));
    cardApi.getAllCards({pageCount,...payload})
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
export const addNewCardTC = (id: string, card: PackCardPayloadType, callback: () => void) =>(dispatch:AppThunkDispatch) => {
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
export const editCardTC = (_id: string, card: PackCardPayloadType, callback: () => void) =>(dispatch:AppThunkDispatch) => {

    dispatch(setAppStatusAC("loading"));
    cardApi.editMyCard(_id,card)
        .then(() =>{
            dispatch(setAppStatusAC("succeeded"));
            callback();
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}

//updateCard Thunk
export const updateCardTC = (card_id: string) => (dispatch:AppThunkDispatch, getState: () => AppStoreType) =>{
    const grade = getState().cardsReducer.localCardGrade

        dispatch(setAppStatusAC("loading"));
        cardApi.editCardGrade(grade, card_id)
            .then((res)=>{
                dispatch(setAppStatusAC("succeeded"));
                dispatch(updateCardAC(res.data.updatedGrade));
                dispatch(saveLocalCardGradeAC(0)) // значение рейтинга 0 дизейблит кнопку next
            })//сетаем 0 чтобы нельзя было кликать на next без простановки нового рейтинга
            .catch((error: AxiosError<{ error: string }>) => {
                dispatch(setAppStatusAC("failed"));
                handleNetworkError(error, dispatch)
            })

}
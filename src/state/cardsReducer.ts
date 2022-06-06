import {cardsAPI} from "../api/cardsAPI";
import {AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";

const SET_CARDS = "CARDS/SET_CARDS"
const SET_IS_LOADING_CARDS = "CARDS/IS_LOADING"

export type CardsType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
}
export type CardsPaginationType = {
    current: number,
    count: number
}
export type InitialProfileStateType =  {
    isLoading: boolean;
    cards: CardsType[];
    pagination: CardsPaginationType
}
const initialState = {
    isLoading: false,
    cards: [],
    pagination: {
        count: 0,
        current: 0
    }
}
export type CardsActionType = SetCardsActionType | SetCardsIsLoadingActionType

export const cardsReducer = (state: InitialProfileStateType = initialState, action: CardsActionType): InitialProfileStateType => {
    switch (action.type) {
        case SET_IS_LOADING_CARDS:
            return { ...state, isLoading: action.isLoading }
        case SET_CARDS:
            return { ...state, cards: action.cards, pagination: action.pagination }
        default:
            return state
    }
}

// actions
export const setCardsIsLoadingAC = (isLoading: boolean) => ({ type: SET_IS_LOADING_CARDS, isLoading } as const)
export const setCardsAC = (cards: CardsType[], pagination: CardsPaginationType) => ({ type: SET_CARDS, cards, pagination } as const)

// types
export type SetCardsIsLoadingActionType = ReturnType<typeof setCardsIsLoadingAC>
export type SetCardsActionType = ReturnType<typeof setCardsAC>

//thunk
export const getCardsTC = (page: string) =>(dispatch:AppThunkDispatch) =>{
    dispatch(setCardsIsLoadingAC(true));
    cardsAPI.getCards(page)
        .then((res) =>{
            dispatch(setCardsAC(res.data.cardPacks, {count: res.data.pageCount, current: res.data.page}));
            dispatch(setCardsIsLoadingAC(false));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setCardsIsLoadingAC(false));
            handleNetworkError(error, dispatch)
        })
}


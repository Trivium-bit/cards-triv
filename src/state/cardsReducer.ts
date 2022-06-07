import {CardPackType, cardsAPI, } from "../api/cardsAPI";
import {AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";
import {setAppStatusAC} from "./app-reducer";

const SET_CARDS = "CARDS/SET_CARDS";
const SET_IS_LOADING_CARDS = "CARDS/IS_LOADING";
const SET_PERSONAL_CARDS_PACKS = "CARDS/SET_PERSONAL_CARDS_PACKS";


export type CardsPaginationType = {
    current: number,
    count: number
}
export type InitialProfileStateType = {
    cardsPacks: CardPackType[];
    pagination: CardsPaginationType;
}
const initialState: InitialProfileStateType = {
    cardsPacks: [],
    pagination: {
        count: 0,
        current: 0
    }
}
export type CardsActionType = SetCardsActionType | SetCardsIsLoadingActionType | SetPersonalCardsPacksActionType

export const cardsReducer = (state: InitialProfileStateType = initialState, action: CardsActionType): InitialProfileStateType => {
    switch (action.type) {

        case SET_CARDS:
            return {...state, cardsPacks: action.cardsPacks, pagination: action.pagination}
        case SET_PERSONAL_CARDS_PACKS:
            return {...state, cardsPacks: action.cardsPacks.filter(cardsPack => cardsPack.user_id === action.user_id)}
        default:
            return state
    }
}

// actions
export const setCardsIsLoadingAC = (isLoading: boolean) => ({type: SET_IS_LOADING_CARDS, isLoading} as const)
export const setCardsAC = (cardsPacks: CardPackType[], pagination: CardsPaginationType) => ({
    type: SET_CARDS,
    cardsPacks,
    pagination
} as const)
export const setPersonalCardsPacksAC = (cardsPacks: CardPackType[], user_id: string) => ({
    type: SET_PERSONAL_CARDS_PACKS,
    cardsPacks,
    user_id
} as const)

// types
export type SetCardsIsLoadingActionType = ReturnType<typeof setCardsIsLoadingAC>;
export type SetCardsActionType = ReturnType<typeof setCardsAC>;
export type SetPersonalCardsPacksActionType = ReturnType<typeof setPersonalCardsPacksAC>;

//thunk
export const getAllCardsPacksTC = (page: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI.getAllCardsPacks(page)
        .then((res) => {
            dispatch(setCardsAC(res.data.cardPacks, {count: res.data.pageCount, current: res.data.page}));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}

export const getMyCardsPacks = (user_id: string, page: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI.getMyCardsPacks(user_id,  page)
        .then((res) => {
                dispatch(setPersonalCardsPacksAC(res.data.cardPacks, user_id));
                dispatch(setAppStatusAC("succeeded"));
            }
        )
        .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch);
            }
        )
}
import {cardsAPI} from "../api/cardsAPI";
import {AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";

const SET_CARDS = "CARDS/SET_CARDS"
const SET_IS_LOADING_CARDS = "CARDS/IS_LOADING"
const INIT_ADD_NEW_CARD_PACK = "CARDS/INIT_ADD_NEW_CARD_PACK"
const ADD_NEW_CARD_PACK = "CARDS/ADD_NEW_CARD_PACK"
const DELETE_CARD_PACK = "CARDS/ADD_NEW_CARD_PACK"

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
export type CardsPaginationType = {
    current: number,
    count: number
}
export type InitialProfileStateType =  {
    isLoading: boolean;
    cards: CardsType[];
    pagination: CardsPaginationType
    addNewCardPack: AddNewCardPackType
}
const initialState = {
    isLoading: false,
    cards: [],
    addNewCardPack: {
        isLoading: false,
        success: undefined,
        error: undefined
    },
    pagination: {
        count: 0,
        current: 0
    }
}
export type CardsActionType = SetCardsActionType | SetCardsIsLoadingActionType | setInitAddNewCardsPackActionType | AddNewCardsPackActionType

export const cardsReducer = (state: InitialProfileStateType = initialState, action: CardsActionType): InitialProfileStateType => {
    switch (action.type) {
        case SET_IS_LOADING_CARDS:
            return { ...state, isLoading: action.isLoading }
        case SET_CARDS:
            return { ...state, cards: action.cards, pagination: action.pagination }
        case INIT_ADD_NEW_CARD_PACK:
            return { ...state, addNewCardPack: {...state.addNewCardPack, isLoading: action.isLoading}}
        case ADD_NEW_CARD_PACK:
            return {
                ...state,
                cards: [action.pack, ...state.cards],
                addNewCardPack: {
                    ...state.addNewCardPack, success: true
                }
            }
        default:
            return state
    }
}

// actions
export const setCardsIsLoadingAC = (isLoading: boolean) => ({ type: SET_IS_LOADING_CARDS, isLoading } as const)
export const setCardsAC = (cards: CardsType[], pagination: CardsPaginationType) => ({ type: SET_CARDS, cards, pagination } as const)
export const setInitAddNewCardPackAC = (isLoading: boolean) => ({ type: INIT_ADD_NEW_CARD_PACK, isLoading } as const)
export const AddNewCardPackAC = (pack: CardsType) => ({ type: ADD_NEW_CARD_PACK, pack } as const)

// types
export type SetCardsIsLoadingActionType = ReturnType<typeof setCardsIsLoadingAC>
export type SetCardsActionType = ReturnType<typeof setCardsAC>
export type setInitAddNewCardsPackActionType = ReturnType<typeof setInitAddNewCardPackAC>
export type AddNewCardsPackActionType = ReturnType<typeof AddNewCardPackAC>


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
//thunk add pack
export const addNewCardPackTC = (pack: CardPackRequestType) =>(dispatch:AppThunkDispatch) =>{
    dispatch(setInitAddNewCardPackAC(true));
    cardsAPI.addPack(pack)
        .then((res) =>{
            dispatch(AddNewCardPackAC(res.data.newCardsPack))
            dispatch(setInitAddNewCardPackAC(false));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setInitAddNewCardPackAC(false));
            handleNetworkError(error, dispatch)
        })
}

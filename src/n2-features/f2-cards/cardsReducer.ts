import store, { AppStoreType } from './../../n1-main/bll/store';
import {cardsAPI, ResponseCardsPackType} from "../../n1-main/dall/cardsAPI";
import { AppThunkDispatch } from "../../n1-main/bll/store";
import { AxiosError } from "axios";
import { setAppStatusAC } from "../../n1-main/bll/app-reducer";
import { handleNetworkError } from "../../utils/error.utils";

const SET_CARDS_PACK = "CARDS/SET_CARDS_PACK"
const GET_CARDS_PACK = "CARDS/GET_CARDS_PACK"

const initialState = {
    cardsPack: {
        packName: "",
        min: 1,
        max: 100,
        sortPacks: "",
        page: 1,
        pageCount: 8,
        user_id: ""
    },
    cardPacksResponse: {
        cardPacks: [
            {
                _id: "",
                user_id: "",
                name: "",
                cardsCount: 0,
                created: "",
                updated: ""
            },
        ],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 8
    }
}

export type RequestCardsPackType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}

type InitialStateType = typeof initialState

export type CardsPackActionType = SetCardsPackActionType | GetCardsPackActionType
export const cardsReducer = (state: InitialStateType = initialState, action: CardsPackActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET_CARDS_PACK":
            return { ...state, cardsPack: action.cardsPack }
        case "CARDS/GET_CARDS_PACK":
            return { ...state, cardPacksResponse: action.cardPacksResponse }
        default:
            return state
    }
}

// actions
export const setCardsPackAC = (cardsPack: RequestCardsPackType) => ({ type: SET_CARDS_PACK, cardsPack } as const)
export const getCardsPackAC = (cardPacksResponse: ResponseCardsPackType) => ({ type: GET_CARDS_PACK, cardPacksResponse } as const)

// types
export type SetCardsPackActionType = ReturnType<typeof setCardsPackAC>
export type GetCardsPackActionType = ReturnType<typeof getCardsPackAC>

//thunk
export const getCardsPuckTC = () => (dispatch: AppThunkDispatch, getState: AppStoreType) => {
    dispatch(setAppStatusAC("loading"));


    cardsAPI.getCardsPack()
        .then((response) => {
            let cardsPack = store.getState().cardsReducer.cardsPack
            dispatch(setCardsPackAC(cardsPack));
            dispatch(getCardsPackAC(response.data));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}


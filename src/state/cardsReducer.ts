import {CardPackType, cardsAPI,} from "../api/cardsAPI";
import {AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";
import {setAppStatusAC} from "./app-reducer";

const SET_CARDS = "CARDS/SET_CARDS";
const SET_IS_LOADING_CARDS = "CARDS/IS_LOADING";
const SET_PERSONAL_CARDS_PACKS = "CARDS/SET_PERSONAL_CARDS_PACKS";
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
export type InitialProfileStateType = {
    isLoading: boolean;
    cardsPacks: CardPackType[];
    pagination: CardsPaginationType;
    addNewCardPack: AddNewCardPackType;
}
const initialState: InitialProfileStateType = {
    isLoading: false,
    cardsPacks: [],
    pagination: {
        count: 0,
        current: 0
    },
    addNewCardPack: {
        isLoading: false,
        success: undefined,
        error: undefined
    },
}
export type CardsActionType = SetCardsActionType
    | SetCardsIsLoadingActionType
    | SetPersonalCardsPacksActionType
    | setInitAddNewCardsPackActionType
    | AddNewCardsPackActionType

export const cardsReducer = (state: InitialProfileStateType = initialState, action: CardsActionType): InitialProfileStateType => {
    switch (action.type) {
        case SET_IS_LOADING_CARDS:
            return {...state, isLoading: action.isLoading}
        case SET_CARDS:
            return {...state, cardsPacks: action.cardsPacks, pagination: action.pagination}
        case SET_PERSONAL_CARDS_PACKS:
            return {...state, cardsPacks: action.cardsPacks.filter(cardsPack => cardsPack.user_id === action.user_id)}
        case INIT_ADD_NEW_CARD_PACK:
            return {...state, addNewCardPack: {...state.addNewCardPack, isLoading: action.isLoading}}
        case ADD_NEW_CARD_PACK:
            return {
                ...state,
                cardsPacks: [action.pack, ...state.cardsPacks],
                addNewCardPack: {
                    ...state.addNewCardPack, success: true
                }
            }
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
export const setInitAddNewCardPackAC = (isLoading: boolean) => ({type: INIT_ADD_NEW_CARD_PACK, isLoading} as const)
export const AddNewCardPackAC = (pack: CardsType) => ({type: ADD_NEW_CARD_PACK, pack} as const)
// types
export type SetCardsIsLoadingActionType = ReturnType<typeof setCardsIsLoadingAC>;
export type SetCardsActionType = ReturnType<typeof setCardsAC>;
export type SetPersonalCardsPacksActionType = ReturnType<typeof setPersonalCardsPacksAC>;
export type setInitAddNewCardsPackActionType = ReturnType<typeof setInitAddNewCardPackAC>
export type AddNewCardsPackActionType = ReturnType<typeof AddNewCardPackAC>;

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
    cardsAPI.getMyCardsPacks(user_id, page)
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
//thunk add pack
export const addNewCardPackTC = (pack: CardPackRequestType) => (dispatch: AppThunkDispatch) => {
    dispatch(setInitAddNewCardPackAC(true));
    cardsAPI.addPack(pack)
        .then((res) => {
            dispatch(AddNewCardPackAC(res.data.newCardsPack))
            dispatch(setInitAddNewCardPackAC(false));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setInitAddNewCardPackAC(false));
            handleNetworkError(error, dispatch)
        })
}
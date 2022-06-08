
import {AppThunkDispatch} from "./store";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";
import {setAppStatusAC} from "./app-reducer";
import {cardsAPI, CardsResponseType} from "../api/cardsAPI";

const SET_CARDS = "CARDS/SET_CARDS";
const SET_IS_LOADING_CARDS = "CARDS/IS_LOADING";
const SET_PERSONAL_CARDS_PACKS = "CARDS/SET_PERSONAL_CARDS_PACKS";
const INIT_ADD_NEW_CARD_PACK = "CARDS/INIT_ADD_NEW_CARD_PACK"
const ADD_NEW_CARD_PACK = "CARDS/ADD_NEW_CARD_PACK"


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
    cardsPacks: CardsResponseType[];
    pagination: CardsPaginationType;
    addNewCardPack: AddNewCardPackType;
    cardPacksTotalCount: number,
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
    cardPacksTotalCount: 0,
}
export type CardsActionType = SetCardsActionType
    | SetCardsIsLoadingActionType
    | SetPersonalCardsPacksActionType
    | setInitAddNewCardsPackActionType
    | AddNewCardsPackActionType

export const cardPacksReducer = (state: InitialProfileStateType = initialState, action: CardsActionType): InitialProfileStateType => {
    switch (action.type) {
        case SET_IS_LOADING_CARDS:
            return {...state, isLoading: action.isLoading}
        case SET_CARDS:
            return {...state, cardsPacks: action.cardsPacks, pagination: action.pagination}
        case SET_PERSONAL_CARDS_PACKS:
            return {
                ...state, cardsPacks: action.cardsPacks.filter(cardsPack => cardsPack.user_id === action.user_id),
                pagination: action.pagination,
            }
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
export const setCardsAC = (cardsPacks: CardsResponseType[], pagination: CardsPaginationType) => ({
    type: SET_CARDS,
    cardsPacks,
    pagination
} as const)
export const setPersonalCardsPacksAC = (cardsPacks: CardsResponseType[], user_id: string, pagination: CardsPaginationType) => ({
    type: SET_PERSONAL_CARDS_PACKS,
    cardsPacks,
    user_id,
    pagination,
} as const)
export const setInitAddNewCardPackAC = (isLoading: boolean) => ({type: INIT_ADD_NEW_CARD_PACK, isLoading} as const)
export const AddNewCardPackAC = (pack: CardsResponseType) => ({type: ADD_NEW_CARD_PACK, pack} as const)
// types
export type SetCardsIsLoadingActionType = ReturnType<typeof setCardsIsLoadingAC>;
export type SetCardsActionType = ReturnType<typeof setCardsAC>;
export type SetPersonalCardsPacksActionType = ReturnType<typeof setPersonalCardsPacksAC>;
export type setInitAddNewCardsPackActionType = ReturnType<typeof setInitAddNewCardPackAC>;
export type AddNewCardsPackActionType = ReturnType<typeof AddNewCardPackAC>;

//thunk
export const getAllCardsPacksTC = (page: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI.getAllCardsPacks(page)
        .then((res) => {

            const countPagesNumber = () => {
                return Math.ceil(res.data.cardPacksTotalCount / res.data.pageCount)
            }
            dispatch(setCardsAC(res.data.cardPacks, {count: countPagesNumber(), current: res.data.page}));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}
/*const countPageNumber = (totalPagesCount) =>{
    return
}*/
export const getMyCardsPacksTC = (user_id: string, currentPage: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI.getMyCardsPacks(user_id, currentPage)
        .then((res) => {
                const countPagesNumber = () => {
                    return Math.ceil(res.data.cardPacksTotalCount / res.data.pageCount)
                }

                dispatch(setPersonalCardsPacksAC(res.data.cardPacks, user_id, {
                        count: countPagesNumber(),
                        current: res.data.page
                    },
                ));
                dispatch(setAppStatusAC("succeeded"));
            }
        )
        .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch);
            }
        )
}
//thunk add pack

export const addNewCardPackTC = (pack: CardPackRequestType, callback: () => void, currentPage:string, user_id:string) =>(dispatch:AppThunkDispatch) =>{
    dispatch(setAppStatusAC("loading"));
    cardsAPI.addPack(pack)
        .then((res) =>{
            dispatch(setAppStatusAC("succeeded"));
            callback();
            if(res.data.newCardsPack.user_id === user_id){
                dispatch(getMyCardsPacksTC(user_id, currentPage))
            } else {
                dispatch(getAllCardsPacksTC(currentPage))

            }
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}
//thunk delete pack
export const deleteCardPackTC = (id: string, callback: () => void) =>(dispatch:AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI.deleteMyCardsPacks(id)
        .then(() =>{
            dispatch(setAppStatusAC("succeeded"));
            callback()
            /*calculatePagesCountTC(dispatch, res.data.deletedCardsPack.user_id, user_id, currentPage)*/
        })
        .catch((error: AxiosError<{ error: string }>) => {
            dispatch(setAppStatusAC("failed"));
            handleNetworkError(error, dispatch)
        })
}
import {cardsAPI} from "../../n1-main/dall/cardsAPI";
import {AppThunkDispatch} from "../../n1-main/bll/store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "../../n1-main/bll/app-reducer";
import {handleNetworkError} from "../../utils/error.utils";

const SET_CARDS = "CARDS/SET_CARDS"

const initialState = {
    isLoading: false,
}



export type InitialProfileStateType = {

};

export type CardsActionType = SetCardsActionType

export const cardsReducer = (state: InitialProfileStateType = initialState, action: CardsActionType): InitialProfileStateType => {
    switch (action.type) {
        case "CARDS/SET_CARDS":
            return {...state, isCardsLoaded:action.isCardsLoaded}
        default:
            return state
    }
}

// actions
export const setCardsAC = (isCardsLoaded: boolean) => ({ type: SET_CARDS, isCardsLoaded } as const)

// types
export type SetCardsActionType = ReturnType<typeof setCardsAC>

//thunk


export const getCardsTC = () =>(dispatch:AppThunkDispatch) =>{
    dispatch(setAppStatusAC("loading"));
    cardsAPI.getCards()
        .then(() =>{
            dispatch(setCardsAC(true));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            handleNetworkError(error, dispatch)
        })
}


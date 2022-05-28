
import {registerAPI, RegisterParamsType} from "../../api/register-API";

import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorType} from "./app-reducer";
import { AxiosError } from "axios";

const initialState = {
    isRegistered:false,
}
type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case 'register/SET-IS-REGISTER':
            return {...state, isRegistered: action.isRegistered}
        default:
            return state;
    }
}
// thunks

export const registerTC = (data: RegisterParamsType):any => {
    return (dispatch: Dispatch<RegisterActionsType>) =>{
        registerAPI.register(data)
        .then(()=>{
           dispatch(registerAC(true));
        })
        .catch((error: AxiosError) => {
            // @ts-ignore
            dispatch(setAppErrorAC(error.response?.data.error));
        })
    }
}

// types
type isRegisteredActionType = ReturnType<typeof registerAC>| SetAppErrorType
export type RegisterActionsType = isRegisteredActionType;

// actions
export const registerAC = (isRegistered: boolean) => ({ type: 'register/SET-IS-REGISTER', isRegistered: isRegistered} as const)

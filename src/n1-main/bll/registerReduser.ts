import {registerAPI, RegisterParamsType} from "../dall/register-API";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import { AxiosError } from "axios";
import {AppThunkDispatch} from "./store";
import {customSuccessAlert} from "../../utils/customSuccessAlertUtils";

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

export const registerTC = (data: RegisterParamsType) => {
    return (dispatch: AppThunkDispatch) =>{
        dispatch(setAppStatusAC("loading"));
        registerAPI.register(data)
        .then(()=>{
           dispatch(registerAC(true));
           dispatch(setAppStatusAC("succeeded"));
           dispatch(setAppErrorAC(null));
           customSuccessAlert()
        })
        .catch((error: AxiosError<{error: string}>) => {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
            setTimeout(() => dispatch(setAppErrorAC(null)),10000);
        })
    }
}

// types
type isRegisteredActionType = ReturnType<typeof registerAC>| AppActionsType
export type RegisterActionsType = isRegisteredActionType;

// actions
export const registerAC = (isRegistered: boolean) => ({ type: 'register/SET-IS-REGISTER', isRegistered: isRegistered} as const)

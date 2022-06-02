import {forgotPassAPI, registerAPI, RegisterParamsType} from "../dall/register-API";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import { AxiosError } from "axios";
import {AppThunkDispatch} from "./store";
import {customSuccessAlert} from "../../utils/customSuccessAlertUtils";
import {RecoveryEmailType} from "../components/pages/PassRecovery/PassRecovery";

const initialState = {
    isRegistered: false,
    email: {
        email: ""
    }
}
type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case 'register/SET-IS-REGISTER':
            return {...state, isRegistered: action.isRegistered}
        case "checkEmail/GET-EMAIL":
            return {...state, email: action.email}
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
            dispatch(setAppStatusAC("failed"));
            dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
        })
    }
}
export const forgotTC = (email:RecoveryEmailType) =>{
    return (dispatch: AppThunkDispatch) =>{
        dispatch(setAppStatusAC("loading"));
        forgotPassAPI.forgotPass(email)
            .then(()=>{
                dispatch(setAppStatusAC("succeeded"));
                dispatch(getEmailAC(email))
            })
            .catch((error: AxiosError<{error: string}>) => {
                dispatch(setAppStatusAC("failed"));
                dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
            })
    }
}
// types
type isRegisteredActionType = ReturnType<typeof registerAC>| AppActionsType | ReturnType<typeof getEmailAC>
export type RegisterActionsType = isRegisteredActionType;

// actions
export const registerAC = (isRegistered: boolean) => ({ type: 'register/SET-IS-REGISTER', isRegistered} as const)
export const getEmailAC = (email: RecoveryEmailType) => ({ type: 'checkEmail/GET-EMAIL', email} as const)

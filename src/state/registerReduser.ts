import {forgotPassAPI, registerAPI, RegisterParamsType} from "../api/registerAPI";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {AppThunkDispatch} from "./store";
import {customSuccessAlert} from "../utils/customSuccessAlertUtils";

import {handleNetworkError} from "../utils/error.utils";
import {RecoveryEmailType} from "../n1-main/components/pages/PassRecovery/PassRecovery";

const initialState = {
    isRegistered: false,
    email: ""
}
type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTER/SET-IS-REGISTER':
            return {...state, isRegistered: action.isRegistered}
        case "GET-EMAIL/GET-EMAIL":
            return {...state, email: action.email}
        default:
            return state;
    }
}
// thunks
export const registerTC = (data: RegisterParamsType) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        registerAPI.registerReducer(data)
            .then(() => {
                dispatch(registerAC(true));
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(null));
                customSuccessAlert()
            })
            .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch)
            })
    }
}
export const forgotTC = (email: RecoveryEmailType) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        forgotPassAPI.forgotPass(email, )
            .then(() => {
                localStorage.setItem("email", JSON.stringify(email.email));
                const valueAsString = localStorage.getItem("email");
                if (valueAsString) {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(getEmailAC(valueAsString));
            }})
            .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch)
            })
    }
}
// types
type isRegisteredActionType = ReturnType<typeof registerAC> | AppActionsType | ReturnType<typeof getEmailAC>
export type RegisterActionsType = isRegisteredActionType;

// actions
export const registerAC = (isRegistered: boolean) => ({type: 'REGISTER/SET-IS-REGISTER', isRegistered} as const)
export const getEmailAC = (email: string) => ({type: 'GET-EMAIL/GET-EMAIL', email} as const)

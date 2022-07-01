import { forgotPassAPI, registerAPI, RegisterParamsType } from "../api/registerAPI";
import { AppActionsType, setAppErrorAC, setAppStatusAC } from "./app-reducer";
import { AxiosError } from "axios";
import { AppThunkDispatch } from "./store";
import { customSuccessAlert } from "../utils/customSuccessAlertUtils";

import { handleNetworkError } from "../utils/error.utils";
import { RecoveryEmailType } from "../n1-main/components/pages/PassRecovery/PassRecovery";

const initialState = {
    isRegistered: false,
    email: "",
    success: false

}
const SET_IS_REGISTER = "REGISTER/SET-IS-REGISTER"
const GET_EMAIL = "REGISTER/GET-EMAIL"
const VERIFICATION_EMAIL = "REGISTER/VERIFICATION-EMAIL"


type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_REGISTER:
            return { ...state, isRegistered: action.isRegistered }
        case GET_EMAIL:
            return { ...state, email: action.email }
        case VERIFICATION_EMAIL:
            return { ...state, success: action.success }
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
                dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
            })
    }
}


export const forgotTC = (email: RecoveryEmailType) => {
    return (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        forgotPassAPI.forgotPass(email,)
            .then((res) => {
                const success = res.data.success
                localStorage.setItem("email", JSON.stringify(email.email));
                const valueAsString = localStorage.getItem("email");
                if (valueAsString) {
                    dispatch(setAppStatusAC("succeeded"));
                    dispatch(getEmailAC(valueAsString));
                    dispatch(verifEmailAC(success))
                }
            })
            .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch)
                dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
            })
    }
}
// types
type isRegisteredActionType = ReturnType<typeof registerAC> | AppActionsType | ReturnType<typeof getEmailAC> | ReturnType<typeof verifEmailAC>
export type RegisterActionsType = isRegisteredActionType;

// actions
export const registerAC = (isRegistered: boolean) => ({ type: SET_IS_REGISTER, isRegistered } as const)
export const getEmailAC = (email: string) => ({ type: GET_EMAIL, email } as const)
export const verifEmailAC = (success: boolean) => ({ type: VERIFICATION_EMAIL, success } as const)

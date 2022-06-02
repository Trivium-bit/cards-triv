import { AxiosError } from "axios"
import { setAppErrorAC, setAppStatusAC, setAppUserAC } from "../../../n1-main/bll/app-reducer"
import { AppThunkDispatch } from "../../../n1-main/bll/store"
import { authAPI, LoginParamsType, NewPasswordType } from "../../../n1-main/dall/login-api"

const SET_IS_LOGGED_IN = "login/SET-IS-LOGGED-IN"
const SEND_NEW_PASSWORD = "login/SEND-NEW-PASSWORD"
const SET_NEW_PASSWORD = "login/SET-NEW-PASSWORD"

const initialState = {
    isLoggedIn: false,
    loginParams: {
        email: "",
        password: "",
        rememberMe: false,
    },
    password: "",
    info: ""
}



type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: isAuthActionType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return { ...state, isLoggedIn: action.isLoggedIn }
        case SEND_NEW_PASSWORD:
            return { ...state, password: action.password }
        case SET_NEW_PASSWORD:
            return { ...state, info: action.info }

        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: SET_IS_LOGGED_IN, isLoggedIn } as const)
export const sendNewPasswordAC = (password: string) => ({ type: SEND_NEW_PASSWORD, password } as const)
export const setNewPasswordAC = (info: string) => ({ type: SET_NEW_PASSWORD, info } as const)

// types
export type IsLoggedInActionsType = ReturnType<typeof setIsLoggedInAC>
export type SendNewPasswordActionsType = ReturnType<typeof sendNewPasswordAC>
export type SetNewPasswordActionsType = ReturnType<typeof setNewPasswordAC>

export type isAuthActionType = IsLoggedInActionsType | SendNewPasswordActionsType | SetNewPasswordActionsType
export type AuthorizationActionType = isAuthActionType

//thunk
export const loginTC = (loginParams: LoginParamsType) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        await authAPI.login(loginParams)
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(null));
                dispatch(setAppUserAC(res.data));
            }).catch((error: AxiosError<{ error: string }>) => {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
                setTimeout(() => dispatch(setAppErrorAC(null)), 10000);
            }
            )
    }

export const sendNewPasswordTC = ({ password, resetPasswordToken }: NewPasswordType) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        await authAPI.setNewPassword({ password, resetPasswordToken })
            .then((res) => {
                sendNewPasswordAC(password)
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(null));
                dispatch(setNewPasswordAC(res.data.info));
            }).catch((error: AxiosError<{ error: string }>) => {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
                setTimeout(() => dispatch(setAppErrorAC(null)), 10000);
            }
            )
    }


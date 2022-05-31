import { AxiosError } from "axios"
import { setAppErrorAC, setAppStatusAC, setAppUserAC } from "../../../n1-main/bll/app-reducer"
import { AppThunkDispatch } from "../../../n1-main/bll/store"
import { authAPI, LoginParamsType, NewPasswordType } from "../../../n1-main/dall/login-api"

const SET_IS_LOGGED_IN = "login/SET-IS-LOGGED-IN"
const SET_NEW_PASSWORD = "login/SET-NEW-PASSWORD"

const initialState = {
    isLoggedIn: false,
    loginParams: {
        email: "",
        password: "",
        rememberMe: false,
    },
    newPassword: {
        password: "",
        resetPasswordToken: ""
    },
    info:""
}


export type ActionType = IsLoggedInActionsType | SetNewPasswordActionsType

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return { ...state, isLoggedIn: action.isLoggedIn }
        case SET_NEW_PASSWORD:
            return { ...state, newPassword: action.newPassword }

        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: SET_IS_LOGGED_IN, isLoggedIn } as const)
export const setNewPasswordAC = (newPassword: NewPasswordType) => ({ type: SET_NEW_PASSWORD, newPassword } as const)

// types
export type IsLoggedInActionsType = ReturnType<typeof setIsLoggedInAC>
export type SetNewPasswordActionsType = ReturnType<typeof setNewPasswordAC>

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

export const sendNewPasswordTC = (newPassword: NewPasswordType) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        await authAPI.setNewPassword(newPassword)
            .then((res) => {
                setNewPasswordAC(newPassword)
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(null));
                return res.data.info
            }).catch((error: AxiosError<{ error: string }>) => {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
                setTimeout(() => dispatch(setAppErrorAC(null)), 10000);
            }
            )
    }


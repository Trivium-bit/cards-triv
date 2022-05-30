import { AxiosError } from "axios"
import {setAppErrorAC, setAppStatusAC, setAppUserAC} from "../../../n1-main/bll/app-reducer"
import { AppThunkDispatch } from "../../../n1-main/bll/store"
import { authAPI, ResponseLoginType } from "../../../n1-main/dall/login-api"

const SET_IS_LOGGED_IN = "login/SET-IS-LOGGED-IN"

const initialState = {
    isLoggedIn: false,
    email: "",
    password: "",
    rememberMe: false
}

const responseData: ResponseLoginType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
}

export type ActionType = IsLoggedInActionsType

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return { ...state, isLoggedIn: action.isLoggedIn }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: SET_IS_LOGGED_IN, isLoggedIn } as const)

// types
export type IsLoggedInActionsType = ReturnType<typeof setIsLoggedInAC>

//thunk
export const loginTC = (email: string, password: string, rememberMe: boolean) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        await authAPI.login({email, password, rememberMe})
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(null));
                dispatch(setAppUserAC(res.data));
            }).catch((error: AxiosError<{error: string}>) => {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
                setTimeout(() => dispatch(setAppErrorAC(null)),10000);
            }
            )
    }


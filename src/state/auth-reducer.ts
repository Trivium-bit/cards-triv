import {AxiosError} from "axios"
import {setAppStatusAC, setAppUserAC, UserType} from "./app-reducer"
import {AppThunkDispatch} from "./store"
import {authAPI, LoginParamsType, NewPasswordType} from "../api/loginAPI"
import {handleNetworkError} from "../utils/error.utils"

const SET_IS_LOGGED_IN = "login/SET-IS-LOGGED-IN"
const SEND_NEW_PASSWORD = "login/SEND-NEW-PASSWORD"
const SET_NEW_PASSWORD = "login/SET-NEW-PASSWORD"
const SET_IS_INITIALIZED_IN = "login/SET_IS_INITIALIZED_IN";

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    password: "",
    info: ""
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: isAuthActionType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn}
        case SEND_NEW_PASSWORD:
            return {...state, password: action.password}
        case SET_IS_INITIALIZED_IN:
            return {...state, isInitialized: action.isInitialized}
        case SET_NEW_PASSWORD:
            return {...state, info: action.info}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: SET_IS_LOGGED_IN, isLoggedIn} as const)
export const sendNewPasswordAC = (password: string) => ({type: SEND_NEW_PASSWORD, password} as const)
export const setNewPasswordAC = (info: string) => ({type: SET_NEW_PASSWORD, info} as const)
export const setInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED_IN, isInitialized} as const);

// types
export type IsLoggedInActionsType = ReturnType<typeof setIsLoggedInAC>;
export type SendNewPasswordActionsType = ReturnType<typeof sendNewPasswordAC>;
export type SetNewPasswordActionsType = ReturnType<typeof setNewPasswordAC>;
export type SetInitializedActionsType = ReturnType<typeof setInitializedAC>;


export type isAuthActionType =
    IsLoggedInActionsType
    | SendNewPasswordActionsType
    | SetNewPasswordActionsType
    | SetInitializedActionsType
export type AuthorizationActionType = isAuthActionType

//thunk
export const loginTC = ({email, password, rememberMe}: LoginParamsType) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        await authAPI.login({email, password, rememberMe})
            .then((res) => {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppUserAC(res.data));
            }).catch((error: AxiosError<{ error: string }>) => {
                    handleNetworkError(error, dispatch);
                }
            )
    }

export const sendNewPasswordTC = ({password, resetPasswordToken}: NewPasswordType) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        await authAPI.setNewPassword({password, resetPasswordToken})
            .then((res) => {
                sendNewPasswordAC(password);
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setNewPasswordAC(res.data.info));
            }).catch((error: AxiosError<{ error: string }>) => {
                    handleNetworkError(error, dispatch);
                }
            )
    }

export const logOutTC = () => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.logOut()
        .then(() => {
            dispatch(setIsLoggedInAC(false));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(setAppUserAC( undefined as UserType));
        })
        .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch);
            }
        )
}

export const initializeAppTC = () => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.authMe().then((res) => {
        if (res.data.name) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(setAppUserAC(res.data));
        }
    })
        .catch(() => {
                dispatch(setAppStatusAC("failed"));
            }
        )
        .finally(() => {
            dispatch(setInitializedAC(true));
        })
}




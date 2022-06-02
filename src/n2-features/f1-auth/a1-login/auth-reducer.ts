import {AxiosError} from "axios"
import {setAppStatusAC, setAppUserAC} from "../../../n1-main/bll/app-reducer"
import {AppThunkDispatch} from "../../../n1-main/bll/store"
import {authAPI, LoginParamsType, NewPasswordType} from "../../../n1-main/dall/login-api"
import {handleNetworkError} from "../../../utils/error.utils";

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

=======
const SET_IS_LOGGED_IN = "login/SET-IS-LOGGED-IN";
const SET_NEW_PASSWORD = "login/SET-NEW-PASSWORD";
const SET_IS_INITIALIZED_IN = "login/SET_IS_INITIALIZED_IN";

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    newPassword: {
        password: "",
        resetPasswordToken: ""
    },
    info: ""
}

export type LoginActionType = IsLoggedInActionsType | SetNewPasswordActionsType | SetInitializedActionsType

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn}
        case SET_NEW_PASSWORD:
            return {...state, newPassword: action.newPassword}
        case SET_IS_INITIALIZED_IN:
            return {...state, isInitialized: action.isInitialized}
>>>>>>> origin/dev
        default:
            return state
    }
}

// actions
<<<<<<< HEAD
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: SET_IS_LOGGED_IN, isLoggedIn } as const)
export const sendNewPasswordAC = (password: string) => ({ type: SEND_NEW_PASSWORD, password } as const)
export const setNewPasswordAC = (info: string) => ({ type: SET_NEW_PASSWORD, info } as const)

// types
export type IsLoggedInActionsType = ReturnType<typeof setIsLoggedInAC>
export type SendNewPasswordActionsType = ReturnType<typeof sendNewPasswordAC>
export type SetNewPasswordActionsType = ReturnType<typeof setNewPasswordAC>
=======
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: SET_IS_LOGGED_IN, isLoggedIn} as const);
export const setNewPasswordAC = (newPassword: NewPasswordType) => ({type: SET_NEW_PASSWORD, newPassword} as const);
export const setInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED_IN, isInitialized} as const);

// types
export type IsLoggedInActionsType = ReturnType<typeof setIsLoggedInAC>;
export type SetNewPasswordActionsType = ReturnType<typeof setNewPasswordAC>;
export type SetInitializedActionsType = ReturnType<typeof setInitializedAC>;
>>>>>>> origin/dev

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
                dispatch(setAppUserAC(res.data));
            }).catch((error: AxiosError<{ error: string }>) => {
                    handleNetworkError(error, dispatch);
                }
            )
    }

export const sendNewPasswordTC = ({ password, resetPasswordToken }: NewPasswordType) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setAppStatusAC("loading"));
        await authAPI.setNewPassword({ password, resetPasswordToken })
            .then((res) => {
<<<<<<< HEAD
                sendNewPasswordAC(password)
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(null));
                dispatch(setNewPasswordAC(res.data.info));
            }).catch((error: AxiosError<{ error: string }>) => {
                dispatch(setAppStatusAC("succeeded"));
                dispatch(setAppErrorAC(error.response?.data.error || "some Error"));
                setTimeout(() => dispatch(setAppErrorAC(null)), 10000);
            }
=======
                setNewPasswordAC(newPassword);
                dispatch(setAppStatusAC("succeeded"));
                return res.data.info
            }).catch((error: AxiosError<{ error: string }>) => {
                    handleNetworkError(error, dispatch);
                }
>>>>>>> origin/dev
            )
    }
export const logOut = () => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.logOut()
        .then(() => {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppUserAC(undefined));
        })
        .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch);
            }
        )
}


export const initializeAppTC = () => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.me()

        .then((res) => {
            if (res.data.name) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
                dispatch(setAppUserAC(res.data));
            }

        })
        .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch)
            }
        ).finally(() => {
        dispatch(setInitializedAC(true));
    })

}


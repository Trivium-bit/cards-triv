import {ResponseLoginType} from "../dall/login-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type UserType = ResponseLoginType | undefined;
//status = loading - крутилку показываем

const initialState = {
    error: null as NullableType<string>,
    status: 'succeeded' as RequestStatusType,
    user: undefined as UserType
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {

        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-USER':
            return {...state, user: action.user}
        case 'APP/USER_LOG_OUT':
            return {...state, user: undefined}
        default:
            return state
    }
}
//actions
export const setAppErrorAC = (error: NullableType<string>) => ({type: "APP/SET-ERROR", error}) as const;
export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status}) as const;
export const setAppUserAC = (user: ResponseLoginType) => ({ type: "APP/SET-USER", user}) as const;
export const userLogOutAC = () => ({ type: 'APP/USER_LOG_OUT'}) as const;

//types
export type NullableType<T> = null | T
type InitialStateType = typeof initialState
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatus = ReturnType<typeof setAppStatusAC>
export type SetAppUser = ReturnType<typeof setAppUserAC>
export type UserLogOut = ReturnType<typeof userLogOutAC>

export type AppActionsType = SetAppErrorType | SetAppStatus | SetAppUser | UserLogOut
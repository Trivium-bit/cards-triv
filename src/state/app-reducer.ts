import {ResponseLoginType} from "../api/loginAPI";
import {AppThunkDispatch} from "./store";
import {profileAPI} from "../api/profileAPI";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//status = loading - крутилку показываем


const initialState = {
    error: null as NullableType<string>,
    status: 'idle' as RequestStatusType,
    user: {} as ResponseLoginType
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-USER':
            return {...state, user: action.user}
        case "APP/UPDATE-USER-NAME":
            return {...state, user: {...state.user, name:action.userName}}
        case "APP/UPDATE-USER-AVATAR":
            return {...state, user: {...state.user, avatar:action.avatar}}
        default:
            return state
    }
}
//actions
export const setAppErrorAC = (error: NullableType<string>) => ({type: "APP/SET-ERROR", error}) as const;
export const setAppStatusAC = (status: RequestStatusType) => {
    // console.log("setAppStatusAC")
    return { type: "APP/SET-STATUS", status} as const;
}
export const setAppUserAC = (user: ResponseLoginType) => ({ type: "APP/SET-USER", user}) as const;
export const updateUserNameAC = (userName: string ) => ({type: "APP/UPDATE-USER-NAME", userName}) as const;
export const updateUserAvatarAC = (userAvatar:string | undefined) => ({type: "APP/UPDATE-USER-AVATAR", avatar: userAvatar}) as const;

//types
export type NullableType<T> = null | T
type InitialStateType = typeof initialState
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatus = ReturnType<typeof setAppStatusAC>
export type SetAppUser = ReturnType<typeof setAppUserAC>
export type UpdateUserName = ReturnType<typeof updateUserNameAC>
export type UpdateUserPhoto = ReturnType<typeof updateUserAvatarAC>

export type AppActionsType = SetAppErrorType | SetAppStatus | SetAppUser | UpdateUserName | UpdateUserPhoto

//thunks

export const updateUserTC = (name: string, avatar: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));

    profileAPI.updateProfile(name, avatar)
        .then((res) => {
            if(res.data){
                dispatch(setAppStatusAC("succeeded"));
                dispatch(updateUserNameAC(res.data.updatedUser.name));
                dispatch(updateUserAvatarAC(res.data.updatedUser.avatar));
            }
        })
        .catch((error: AxiosError<{ error: string }>) => {
                handleNetworkError(error, dispatch);
            }
        )
}
import {ResponseLoginType} from "../api/loginAPI";
import {AppThunkDispatch} from "./store";
import {profileAPI} from "../api/profileAPI";
import {AxiosError} from "axios";
import {handleNetworkError} from "../utils/error.utils";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//status = loading - крутилку показываем

const SET_ERROR = "APP/SET-ERROR"
const SET_STATUS = "APP/SET-STATUS"
const SET_USER = "APP/SET-USER"
const UPDATE_USER_NAME = "APP/UPDATE-USER-NAME";
const UPDATE_USER_AVATAR = "APP/UPDATE-USER-AVATAR";

const initialState = {
    error: null as NullableType<string>,
    status: 'idle' as RequestStatusType,
    user: {} as ResponseLoginType
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_USER:
            return {...state, user: action.user}
        case UPDATE_USER_NAME:
            return {...state, user: {...state.user, name:action.userName}}
        case UPDATE_USER_AVATAR:
            return {...state, user: {...state.user, avatar:action.avatar}}
        default:
            return state
    }
}
//actions
export const setAppErrorAC = (error: NullableType<string>) => ({type: SET_ERROR, error}) as const;
export const setAppStatusAC = (status: RequestStatusType) => ({ type: SET_STATUS, status} as const);
export const setAppUserAC = (user: ResponseLoginType) => ({ type: SET_USER, user}) as const;
export const updateUserNameAC = (userName: string ) => ({type: UPDATE_USER_NAME, userName}) as const;
export const updateUserAvatarAC = (userAvatar:string | undefined) => ({type: UPDATE_USER_AVATAR, avatar: userAvatar}) as const;

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
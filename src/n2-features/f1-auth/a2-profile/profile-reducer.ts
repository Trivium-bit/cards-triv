import { Dispatch } from "redux";
import {profileAPI, ProfileApiResponseType} from "../../../n1-main/dall/profile-api";

const SET_IS_GETTING_PROFILE = "profile/SET_IS_GETTING"
const SET_CURRENT_PROFILE = "profile/SET_CURRENT"
const SET_ERROR = "profile/SET_ERROR"

const initialState = {
    profile: undefined,
    isLoading: false,
    error: undefined
}

export type ErrorType = {
    code: number;
    message: string;
}

export type InitialProfileStateType = {
    profile?: ProfileApiResponseType;
    isLoading: boolean;
    error?: ErrorType
};

export type ActionType = IsLoadingProfileActionType | setProfileActionType | setErrorActionType

export const profileReducer = (state: InitialProfileStateType = initialState, action: ActionType): InitialProfileStateType => {
    switch (action.type) {
        case SET_IS_GETTING_PROFILE:
            return { ...state, isLoading: action.loading };
        case SET_CURRENT_PROFILE:
            return { ...state, profile: action.profile };
        case SET_ERROR:
            return { ...state, error: action.error };

        default:
            return state
    }
}

// actions
export const setIsLoadingProfileAC = (loading: boolean) => ({ type: SET_IS_GETTING_PROFILE, loading } as const)
export const setProfileAC = (profile:ProfileApiResponseType) => ({ type: SET_CURRENT_PROFILE, profile } as const)
export const setErrorAC = (error:ErrorType) => ({ type: SET_ERROR, error } as const)

// types
export type IsLoadingProfileActionType = ReturnType<typeof setIsLoadingProfileAC>
export type setProfileActionType = ReturnType<typeof setProfileAC>
export type setErrorActionType = ReturnType<typeof setErrorAC>

//thunk
export const getProfileTC = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setIsLoadingProfileAC(true))
    await profileAPI.getProfile()
        .then((res) => {
            dispatch(setIsLoadingProfileAC(false))
            dispatch(setProfileAC(res.data))
        }).catch (e => {
            const code = e.response.status;
            const message = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setIsLoadingProfileAC(false))
            dispatch(setErrorAC({
                message, code
            }))
        })
}


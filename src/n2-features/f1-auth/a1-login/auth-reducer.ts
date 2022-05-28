import { Dispatch } from "redux"
import { authAPI, ResponseLoginType } from "../../../n1-main/dall/login-api"

const initialState = {
    isLoggedIn: false,
    email: "",
    password: "",
    rememberMe: false
}

/* const responseData: ResponseLoginType = { 
    _id: '',
    email: '', 
    name: '',
    avatar: '', 
    publicCardPacksCount: 0,
    created: Date, 
    updated: Date,
    isAdmin: false, 
    verified: false,
    rememberMe: false,
    error: 'string',
    } */

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: IsLoggedInActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.isLoggedIn }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', isLoggedIn } as const)

// types
export type IsLoggedInActionsType = ReturnType<typeof setIsLoggedInAC>

//thunk
export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch<IsLoggedInActionsType>) => {
    await authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
        }).catch (e => {
            const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        }
      )
}


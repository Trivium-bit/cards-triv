import { Dispatch } from "redux"
import { authAPI } from "../../../n1-main/dall/login-api"

const initialState = {
    isLoggedIn: false,
    email: "",
    password: "",
    rememberMe: false
}

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
        }).catch((error) => {
           
        })
}


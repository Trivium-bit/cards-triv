export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//status = loading - крутилку показываем

const initialState = {
    error: null as NullableType<string>,
    status: 'succeeded' as RequestStatusType,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {

        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}
//actions
export const setAppErrorAC = (error: NullableType<string>) => ({type: "APP/SET-ERROR", error}) as const;
export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status}) as const;

//types
export type NullableType<T> = null | T
type InitialStateType = typeof initialState
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatus = ReturnType<typeof setAppStatusAC>
export type AppActionsType = SetAppErrorType | SetAppStatus
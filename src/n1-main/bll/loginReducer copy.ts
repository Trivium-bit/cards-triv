const initState = {

}

export const loginReducer = (state = initState, action: ActionsType): typeof initState => { // fix any
    switch (action.type) {
        case 'LOGIN': {
            return state
        }
        default: return state
    }
}


type ActionsType = isLoadingActionType;

type isLoadingActionType = {
    type: 'LOGIN'

}


export const loginAC = (isLoading: boolean): isLoadingActionType => ({ type: 'LOGIN'} as const)// fix any
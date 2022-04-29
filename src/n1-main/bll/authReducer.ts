const initState = {

}

export const authReducer = (state = initState, action: ActionsType): typeof initState => { // fix any
    switch (action.type) {
        case 'AUTH': {
            return state
        }
        default: return state
    }
}


type ActionsType = isLoadingActionType;

type isLoadingActionType = {
    type: 'AUTH'

}


export const loginAC = (isLoading: boolean): isLoadingActionType => ({ type: 'AUTH'} as const)// fix any
const initState = {

}
export enum ACTIONS_TYPE {
    SET_PROFILE = "SET-PROFILE",
    ADD_POST = "ADD-POST",
    SET_MY_PROFILE_PHOTO = "SET-MY-PROFILE_PHOTO",
    UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT",
    SET_SOME_USER_PROFILE = "SET-SOME-USER-PROFILE",
    SET_STATUS = "SET-STATUS"
}
export const registerReducer = (state = initState, action: ActionsType): typeof initState => {
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
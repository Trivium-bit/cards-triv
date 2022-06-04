import { AppStoreType } from "../../n1-main/bll/store";
import { NullableType, RequestStatusType, UserType } from "../../n1-main/bll/app-reducer";
import { ResponseCardsPackType } from "../../n1-main/dall/cardsAPI";

export const appStatusSelector = (state: AppStoreType): RequestStatusType => {
    return state.appReducer.status
}
export const appStatusErrorSelector = (state: AppStoreType): NullableType<string> => {
    return state.appReducer.error
}
export const appUserSelector = (state: AppStoreType): UserType => {
    return state.appReducer.user
}
export const isRegisteredSelector = (state: AppStoreType): boolean => {
    return state.registerReducer.isRegistered
}
<<<<<<< HEAD
export const emailSelector = (state: AppStoreType): string => {
    return state.registerReducer.email.email
=======
export const emailSelector = (state: AppStoreType):string =>{
    return state.registerReducer.email
>>>>>>> 392f7765219770f4fc9fc5865e82266de54c55c2
}
export const isLoggedInSelector = (state: AppStoreType): boolean => {
    return state.authReducer.isLoggedIn
}
export const carsPackSelector = (state: AppStoreType): ResponseCardsPackType => {
    return state.cardsReducer.cardPacksResponse
}
export const isInitializedSelector = (state: AppStoreType): boolean => {
    return state.authReducer.isInitialized
}


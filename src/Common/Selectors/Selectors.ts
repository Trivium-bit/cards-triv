import {AppStoreType} from "../../state/store";
import {NullableType, RequestStatusType, UserType} from "../../state/app-reducer";
import {CardsPaginationType} from "../../state/cardsReducer";
import {CardPackType} from "../../api/cardsAPI";

export const appStatusSelector = (state: AppStoreType):RequestStatusType =>{
    return state.appReducer.status
}
export const appStatusErrorSelector = (state: AppStoreType):NullableType<string> =>{
    return state.appReducer.error
}
export const appUserSelector = (state: AppStoreType):UserType =>{
    return state.appReducer.user
}
export const isRegisteredSelector = (state: AppStoreType):boolean =>{
    return state.registerReducer.isRegistered
}
export const emailSelector = (state: AppStoreType):string =>{
    return state.registerReducer.email
}
export const isLoggedInSelector = (state: AppStoreType):boolean =>{
    return state.authReducer.isLoggedIn
}
export const isInitializedSelector = (state: AppStoreType):boolean =>{
    return state.authReducer.isInitialized
}
export const myCardsPaginationSelector = (state: AppStoreType): CardsPaginationType =>{
    return state.cardsReducer.pagination
}
export const myCardsSelector = (state: AppStoreType): CardPackType[] =>{
    return state.cardsReducer.cardsPacks
}

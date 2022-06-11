import {AppStoreType} from "../../state/store";
import {NullableType, RequestStatusType, UserType} from "../../state/app-reducer";
import {PacksPaginationType} from "../../state/cardPacksReducer";
import {PacksResponseType} from "../../api/cardPacksAPI";
import {PackCardType} from "../../api/cardAPI";
import {PaginationCardType} from "../../state/cardsReducer";

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
export const isLoggedInSelector = (state: AppStoreType):boolean =>{
    return state.authReducer.isLoggedIn
}
export const isInitializedSelector = (state: AppStoreType):boolean =>{
    return state.authReducer.isInitialized
}
export const myCardsIsLoadingSelector = (state: AppStoreType): boolean =>{
    return state.cardPacksReducer.isLoading
}
export const myCardsPaginationSelector = (state: AppStoreType): PacksPaginationType =>{
    return state.cardPacksReducer.pagination
}
export const myCardsPacksSelector = (state: AppStoreType): Array<PacksResponseType> =>{
    return state.cardPacksReducer.cardsPacks
}
/*export const selectNewCardsPackSelector = (state: AppStoreType): AddNewCardPackType =>{
    return state.cardPacksReducer.addNewCardPack
}*/
export const userNameSelector = (state: AppStoreType): string =>{
    return state.appReducer.user.name
}
export const userIdSelector = (state: AppStoreType): string =>{
    return state.appReducer.user._id
}
export const getCardsSelector = (state: AppStoreType): PackCardType[] =>{
    return state.cardsReducer.cards
}
export const cardPaginationSelector = (state: AppStoreType): PaginationCardType =>{
    return state.cardsReducer.pagination
}
import {AppStoreType} from "../../state/store";
import {NullableType, RequestStatusType, UserType} from "../../state/app-reducer";
/*import {PacksPaginationType} from "../../state/cardPacksReducer";*/
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
export const myCardsPacksSelector = (state: AppStoreType): Array<PacksResponseType> =>{
    return state.cardPacksReducer.cardsPacks
}
export const userNameSelector = (state: AppStoreType): string =>{
    return state.appReducer.user.name
}
export const userIdSelector = (state: AppStoreType): string =>{
    return state.appReducer.user._id
}
export const getCardsSelector = (state: AppStoreType): PackCardType[] =>{
    return state.cardsReducer.cards
}
export const getLocalCardGradeSelector = (state: AppStoreType): number =>{
    return state.cardsReducer.localCardGrade
}
export const cardPaginationSelector = (state: AppStoreType): PaginationCardType =>{
    return state.cardsReducer.pagination
}
export const cardFilterQuestionSelector = (state: AppStoreType): string =>{
    return state.cardsReducer.question
}
export const cardFilterAnswerSelector = (state: AppStoreType): string =>{
    return state.cardsReducer.answer
}
export const isMyTableSelector = (state: AppStoreType):boolean =>{
    return state.cardPacksReducer.isMyTable
}
export const minSelector = (state: AppStoreType):number =>{
    return state.cardPacksReducer.min
}
export const maxSelector = (state: AppStoreType):number =>{
    return state.cardPacksReducer.max
}
export const searchPackNameSelector = (state: AppStoreType):string =>{
    return state.cardPacksReducer.packName
}
export const totalCardPacksPageCountSelector = (state: AppStoreType):number =>{
    return state.cardPacksReducer.cardPacksTotalCount
}
export const cardPacksCurrentPageSelector = (state: AppStoreType):number =>{
    return state.cardPacksReducer.page
}
export const sortCardPacksSelector = (state: AppStoreType):string =>{
    return state.cardPacksReducer.sortPacks
}



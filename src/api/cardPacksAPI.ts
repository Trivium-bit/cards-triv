import {CardPackRequestType, CardPackUpdateRequestType} from "../state/cardPacksReducer";
import {instance} from "./instance";


export type GetCardsType = {
    packName?: string // english - default value
    min?: number
    max?: number
    sortPacks?: string // 0updated - default value,
    page?: number
    pageCount?: number
    user_id?: string
}

export const cardPacksAPI = {
    getCardsPacks(args: GetCardsType) {
        return instance.get<ResponseCardsPackType>(`/cards/pack`,{params: args});
    },
    addPack(pack: CardPackRequestType) {
        return instance.post<ResponseAddPackType>("/cards/pack", {cardsPack: pack})
    },
    deleteMyCardsPacks(id: string) {
        return instance.delete<ResponseDeletePackType>(`/cards/pack?id=${id}`);
    },
    editMyCardsPacks(pack: CardPackUpdateRequestType) {
        return instance.put<ResponseUpdatePackType>('/cards/pack', {cardsPack: pack});
    }



}


//types
export type PacksResponseType = {
    _id: string; //айди пэка
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
}

export type ResponseCardsPackType = {
    cardPacks: Array<PacksResponseType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type ResponseAddPackType = {
    newCardsPack:PacksResponseType
}
export type ResponseDeletePackType = {
    deletedCardsPack:PacksResponseType
}
export type ResponseUpdatePackType = {
    updatedCardsPack:PacksResponseType
}
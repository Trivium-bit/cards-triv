import axios from 'axios'
import {CardPackRequestType} from "../state/cardsReducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})
export const pageCount = 8;
export const cardsAPI = {
    getAllCardsPacks(currentPage: string) {
        return instance.get<ResponseCardsPackType>(`/cards/pack?page=${currentPage}&pageCount=${pageCount}`);
    },
    addPack(pack: CardPackRequestType) {
        return instance.post<ResponseAddPackType>("/cards/pack", {cardsPack: pack})
    },
    getMyCardsPacks(user_id: string, currentPage: string) {
        return instance.get<ResponseCardsPackType>(`/cards/pack?page=${currentPage}&user_id=${user_id}&pageCount=${pageCount}`);
    },
    deleteMyCardsPacks(id: string) {
        return instance.delete<ResponseDeletePackType>(`/cards/pack?id=${id}`);
    }

}


//types
export type CardsResponseType = {
    _id: string;
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
    cardPacks: Array<CardsResponseType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type ResponseAddPackType = {
    newCardsPack:CardsResponseType
}
export type ResponseDeletePackType = {
    deletedCardsPack:CardsResponseType
}
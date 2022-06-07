import axios from 'axios'
import {CardPackRequestType} from "../state/cardsReducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})
const pageCount = 8;
export const cardsAPI = {
    getAllCardsPacks(page: string) {
        return instance.get<ResponseCardsPackType>(`/cards/pack?page=${page}&pageCount=${pageCount}`);
    },
    addPack(pack: CardPackRequestType) {
        return instance.post("/cards/pack", {cardsPack: pack})
    },
    getMyCardsPacks(user_id: string, page: string){
        return instance.get<ResponseCardsPackType>(`/cards/pack?page=${page}&user_id=${user_id}&pageCount=${pageCount}`);
    },
}


//types
export type CardPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string,
}

export type ResponseCardsPackType = {
    cardPacks: Array<CardPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
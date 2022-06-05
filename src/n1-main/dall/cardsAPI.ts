import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const cardsAPI = {
    getCardsPack() {
        return instance.get<ResponseCardsPackType>("/cards/pack");
    }
}

//types
export type CardPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

export type ResponseCardsPackType = {
    cardPacks: Array<CardPackType>  
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
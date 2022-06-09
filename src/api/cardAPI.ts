import axios from "axios";


export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})
export const pageCount = 8;
export const cardApi = {
    getAllCards(id: string, currentPage: string) {
        return instance.get(`/cards/card?cardsPack_id=${id}&page=${currentPage}&pageCount=${pageCount}`);
    },
    addNewCard(id: string,card: PackCardType) {
        return instance.post(`/cards/card`, {card: {
                ...card,
                cardsPack_id: id
            }});
    },
    deleteMyCard(id:string) {
        return instance.delete(`/cards/card?id=${id}`);
    },
    editMyCard() {
        return instance.delete(`/cards/card`);
    }
}

export type PackCardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?:string
    min?: number
    max?: number
    sortCards?:string
    page?: number
    pageCount?:number
}
export type PackCardType = {
    answer: string
    question: string
    cardsPack_id?: string
    user_id?: string
    created?: string
    updated?: string
    rating?: number
    _id?: string
}
import {instance} from "./instance";

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
    editMyCard(_id:string,question:string, answer:string) {
        return instance.put('/cards/card', {card: {_id, question, answer}});
    }
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
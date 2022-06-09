import {instance} from "./instance";


export const cardApi = {
    getAllCards(id: string) {
        return instance.get(`/cards/card?cardsPack_id=${id}`);
    },
    addNewCard(id: string,card: PackCardType) {
        return instance.post(`/cards/card`, {card: {
                ...card,
                cardsPack_id: id
            }});
    },
    deleteMyCard(id:string) {
        return instance.delete(`/cards/card?id=${id}`);
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
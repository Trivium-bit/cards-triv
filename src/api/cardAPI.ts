import {instance} from "./instance";

export const pageCount = 8;
export const cardApi = {
    getAllCards(id: string, currentPage: string) {
        return instance.get<ResponseCardType>(`/cards/card?cardsPack_id=${id}&page=${currentPage}&pageCount=${pageCount}`);
    },
    addNewCard(id: string,card: PackCardType) {
        return instance.post<ResponseAddCardType>(`/cards/card`, {card: {
                ...card,
                cardsPack_id: id
            }});
    },
    deleteMyCard(id:string) {
        return instance.delete<ResponseDeleteCardType>(`/cards/card?id=${id}`);
    },
    editMyCard(_id:string,question:string, answer:string) {
        return instance.put<ResponseUpdateCardType>('/cards/card', {card: {_id, question, answer}});
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

export type ResponseCardType ={
    cards: PackCardType[]
    packUserId: number
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: string
}
export type ResponseAddCardType = {
    answer: string
    question: string
}
export type ResponseDeleteCardType = {
    deletedCard:PackCardType
}
export type ResponseUpdateCardType = {
    updatedCard:PackCardType
}
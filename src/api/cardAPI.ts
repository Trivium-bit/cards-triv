import {instance} from "./instance";

export type GetCardsParams = {
    cardsPack_id: string | undefined;
    page?: string;
    pageCount?: number;
    cardAnswer?: string;
    cardQuestion?: string;
}

export const pageCount = 8;
export const cardApi = {
    getAllCards(params: GetCardsParams) {

        if (!params.pageCount) {
            params.pageCount = pageCount;
        }

        return instance.get<ResponseCardType>('/cards/card', {params});
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
    },
    editCardGrade(grade: number, card_id: string){
        return instance.put<ResponseUpdateCardParamsType>('/cards/grade', {grade, card_id})
    }
}

export type PackCardType = {
    _id?: string //это айдишка карточки в пэке
    cardsPack_id?: string //это айдишка пэка
    user_id?: string
    answer: string
    question: string
    grade?: number,
    shots?: number
    rating?: number
    created?: string
    updated?: string
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
export type updatedCardType = {
    cardsPack_id: string,
    card_id: string,
    user_id: string,
    grade: number,
    shots: number
    created: string
    updated: string
}
export type ResponseUpdateCardParamsType = {
    updatedGrade:updatedCardType
}


import {instance} from "./instance";

export type GetCardsParams = {
    cardsPack_id: string | undefined;
    page?: string;
    pageCount?: number;
    cardAnswer?: string;
    cardQuestion?: string;
    questionImg?: string
    answerImg?: string
}


export const cardApi = {
    getAllCards(params: GetCardsParams) {
        return instance.get<ResponseCardType>('/cards/card', {params});
    },
    addNewCard(cardsPack_id: string,card: PackCardPayloadType) {
        return instance.post<ResponseAddCardType>(`/cards/card`, {card: {...card, cardsPack_id}});
    },
    deleteMyCard(id:string) {
        return instance.delete<ResponseDeleteCardType>(`/cards/card?id=${id}`);
    },
    editMyCard(_id:string, card: PackCardPayloadType) {
        return instance.put<ResponseUpdateCardType>('/cards/card', {card: {_id, ...card}});
    },
    editCardGrade(grade: number, card_id: string){
        return instance.put<ResponseUpdateCardParamsType>('/cards/grade', {grade, card_id})
    }
}

export type PackCardPayloadType = {
    answer?: string ;
    question?: string ;
    questionImg: any
    answerImg: any
}

export type PackCardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
    answerImg: string,
    answerVideo: string,
    questionImg: string,
    questionVideo: string
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
    questionImg: string
    answerImg: string
}
export type ResponseUpdateCardParamsType = {
    updatedGrade:updatedCardType
}
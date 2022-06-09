import {CardPackRequestType} from "../state/cardPacksReducer";
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

/*export const PacksAPI = {
    getPacks: (args: GetCardsType) => {
        return instance
            .get<GetCardsPackResponseType>('/cards/pack', {
                params: args,
            })
            .then((res) => res.data)
    },
    addPack: (args: SetCardsPackType) => {
        return instance.post('/cards/pack', args).catch(() => clearState())
    },
    deletePack: (args: DeleteCardsPackType) => {
        return instance
            .delete(`cards/pack`, { params: args })
            .catch(() => clearState())
    },
    updatePack: (args: UpdateCardsPackType) => {
        return instance.put('/cards/pack', args).catch(() => clearState())
    },
}*/



export const cardPacksAPI = {
    getCardsPacks(args: GetCardsType) {
        return instance.get<ResponseCardsPackType>(`/cards/pack`,{
            params: {...args}
        });
    },
    addPack(pack: CardPackRequestType) {
        return instance.post<ResponseAddPackType>("/cards/pack", {cardsPack: pack})
    },
    deleteMyCardsPacks(id: string) {
        return instance.delete<ResponseDeletePackType>(`/cards/pack?id=${id}`);
    },
    editMyCardsPacks(_id: string, name: string) {
        return instance.put<ResponseUpdatePackType>('/cards/pack', { cardsPack: { _id, name } });
    }



}


//types
export type PacksResponseType = {
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
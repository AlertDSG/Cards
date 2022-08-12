import {instance} from "../auth/authAPI";
import {sortPacks} from "../../common/TypeForSort";

export const cardsAPI = {
    getCards: (params: CardsParamsType) => {
        return instance.get(`cards/card`, {params: params})
    },
    createCard: (card: CardPostType) => {
        return instance.post(`cards/card`, {card})
    },
    deleteCard: (id: string) => {
        return instance.delete(`cards/card?id=${id}`)
    },
    updateCard: (card: CardUpdateType) => {
        return instance.put(`cards/card`, {card})
    }
}

export type CardUpdateType = {
    _id: string
    question?: string
    answer?: string
    comments?: string
}

export type CardPostType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
    type: string,
    rating: number,
    more_id: string,
}

export type ResponseCardsType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardsParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: sortPacks
    page?: number
    pageCount?: number
}
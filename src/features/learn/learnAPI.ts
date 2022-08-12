import {instance} from "../auth/authAPI";
import {ResponseCardsType} from "../cards/cardsAPI";

export const learnAPI = {
    getLearnCards: (cardsPack_id: string, cardsTotalCount: number) => {
        return instance.get<ResponseCardsType>(`cards/card`, {params: {cardsPack_id, pageCount: cardsTotalCount}})
    },
    updateGrade: (data: RequestGradeType) => {
        return instance.put<ResponseGradeType>(`cards/grade`, data)
    },
}

export type RequestGradeType = {
    grade: number
    card_id: string
}

export type ResponseGradeType = {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
}
import {CardType, ResponseCardsType} from "../cards/cardsAPI";
import {AppThunk} from "../../app/store";
import {learnAPI, RequestGradeType, ResponseGradeType} from "./learnAPI";

const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    page: 1,
    pageCount: 4,
    token: '',
    tokenDeathTime: 0,
    cardsPack_id: '',
    grade: 0,
    packName: '',
}


type InitialStateType = typeof initialState

export const learnReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'learn/SET_CARDS' :
            return {...state, cards: action.data.cards}
        case "learn/SET_CARDS_ID":
            return {...state, cardsPack_id: action.cardsPack_id, packName: action.packName , cardsTotalCount: action.cardsTotalCount}
        case 'learn/SET_UPDATE_GRADE_CARD':
            return {...state, cards: state.cards.map(c => c._id === action.data.card_id ? {...c, grade: action.data.grade} : c)}
        default:
            return state
    }
}

export const setLearnCards = (data: ResponseCardsType) => ({type: 'learn/SET_CARDS', data}) as const
export const setLearnCardsId = (cardsPack_id: string, packName: string, cardsTotalCount: number) => ({type: 'learn/SET_CARDS_ID', cardsPack_id, packName, cardsTotalCount}) as const
export const setUpdateGradeCard = (data: ResponseGradeType) => ({type: 'learn/SET_UPDATE_GRADE_CARD', data}) as const

export const fetchLearnCards = (): AppThunk => async (dispatch, getState) => {
    try {
        const cardsPack_id = getState().learn.cardsPack_id
        const cardsTotalCount = getState().learn.cardsTotalCount
        console.log(cardsTotalCount)
        const res = await learnAPI.getLearnCards(cardsPack_id, cardsTotalCount)
        dispatch(setLearnCards(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const updateGradeLearnCards = (data: RequestGradeType): AppThunk => async dispatch=> {
    try {
        const res = await learnAPI.updateGrade(data)
        dispatch(setUpdateGradeCard(res.data))
    } catch (err) {
        console.log(err)
    }
}

type AppActionsType = ReturnType<typeof setLearnCards> | ReturnType<typeof setLearnCardsId> | ReturnType<typeof setUpdateGradeCard>
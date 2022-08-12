import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {PackCreateType, PackParamsType, packsAPI, PackType, PackUpdateType, ResponsePacksType} from "./packsApi";
import {setLoginErrorStatusAC} from "../auth/auth-reducer";

const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: null as null | number,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    packId: '',
    token: null as null | number,
    tokenDeathTime: null as null | number,
    params: {
        packName: undefined,
        min: undefined,
        max: undefined,
        sortPacks: undefined,
        page: undefined,
        pageCount: undefined,
        user_id: undefined,
    } as PackParamsType
}


type InitialStateType = typeof initialState

export const packsReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'packs/INITIAL_PACKS':
            return {
                ...state,
                cardPacks: action.data.cardPacks,
                minCardsCount: action.data.minCardsCount,
                maxCardsCount: action.data.maxCardsCount,
                cardPacksTotalCount: action.data.cardPacksTotalCount,
            }
        case 'packs/CHANGE_PARAMS':
            return {
                ...state,
                params: {...state.params, ...action.params}
            }
        case 'packs/SET_PACK_ID':
            return {
                ...state,
                packId: action.id
            }
        default:
            return state
    }
}

export const initialCards = (data: ResponsePacksType) => ({type: 'packs/INITIAL_PACKS', data}) as const
export const changeMinMaxCards = (data: number[]) => ({type: 'packs/CHANGE_MIN_MAX_PACKS', data}) as const
export const changeParamsPacks = (params: PackParamsType) => ({type: 'packs/CHANGE_PARAMS', params}) as const
export const setPackId = (id: string) => ({type: 'packs/SET_PACK_ID', id}) as const


export const setPacks = (): AppThunk => async (dispatch, getState) => {
    const params = getState().packs.params

    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsAPI.getCards(params)
        dispatch(initialCards(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e){
        dispatch(setAppStatusAC('succeeded'))
        console.log(e)
    }
}

export const createPack = (data: PackCreateType): AppThunk => async (dispatch) => {

    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.createPack(data)
        dispatch(setPacks())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any){
        dispatch(setLoginErrorStatusAC(e.response.data.error))
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const removePack = (id: string): AppThunk => async (dispatch) => {

    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.deletePack(id)
        dispatch(setPacks())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any){
        dispatch(setLoginErrorStatusAC(e.response.data.error))
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const updateUserPack = (data: PackUpdateType): AppThunk => async (dispatch) => {

    dispatch(setAppStatusAC('loading'))
    try {
        await packsAPI.updatePack(data)
        dispatch(setPacks())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any){
        dispatch(setLoginErrorStatusAC(e.response.data.error))
        dispatch(setAppStatusAC('succeeded'))
    }
}

type AppActionsType =
    ReturnType<typeof initialCards>
    | ReturnType<typeof changeMinMaxCards>
    | ReturnType<typeof changeParamsPacks>
    | ReturnType<typeof setPackId>

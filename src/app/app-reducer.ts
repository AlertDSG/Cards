import {NameCellType, SortType} from "../common/TypeForSort";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState= {
    isInitialized: false,
    error: null as null | string,
    status: 'succeeded' as RequestStatusType,
    statusSort: '' as NameCellType,
    regulator: 'decr' as SortType,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/IS_INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'app/SET_APP_ERROR':
            return {...state, error: action.error}
        case 'app/SET_APP_STATUS':
            return {...state, status: action.status}
        case 'app/CHANGE_STATUS_SORT':
            return {
                ...state,
                statusSort: action.statusSort,
                regulator: action.regulator
            }
        default:
            return state
    }
}

export const initialAC = (isInitialized: boolean) => ({type: 'app/IS_INITIALIZED', isInitialized}) as const
export const setAppErrorAC= (error: null | string) => ({type: 'app/SET_APP_ERROR', error}) as const
export const setAppStatusAC= (status: RequestStatusType) => ({type: 'app/SET_APP_STATUS', status}) as const
export const changeStatusSort = (statusSort: NameCellType, regulator: SortType) => ({type: 'app/CHANGE_STATUS_SORT', statusSort, regulator}) as const

export type AppActionsType = ReturnType<typeof initialAC> | ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>| ReturnType<typeof changeStatusSort>
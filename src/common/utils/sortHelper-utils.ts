import {NameCellType, sortPacks, SortType} from "../TypeForSort";
import {changeParamsPacks} from "../../features/packs/packs-reducer";
import {Dispatch} from "redux";
import {changeParamsCards} from "../../features/cards/cards-reducer";
import {changeStatusSort} from "../../app/app-reducer";


export const sortHelperUtils = (regulator: SortType, cell: NameCellType, dispatch: Dispatch, id: string) => {


    if (cell === 'packName') {
        if (regulator === 'decr') {
            dispatch(changeParamsPacks({sortPacks: sortPacks.DESC_NAME}))
            dispatch(changeStatusSort(cell, regulator))
        } else {
            dispatch(changeParamsPacks({sortPacks: sortPacks.INCR_NAME}))
            dispatch(changeStatusSort(cell, regulator))
        }
    }

    if (cell === 'cards') {
        if (regulator === 'decr') {
            dispatch(changeParamsPacks({sortPacks: sortPacks.DESC_CARDS_COUNT}))
            dispatch(changeStatusSort(cell, regulator))
        } else {
            dispatch(changeParamsPacks({sortPacks: sortPacks.INCR_CARDS_COUNT}))
            dispatch(changeStatusSort(cell, regulator))
        }
    }

    if (cell === 'update') {
        if (regulator === 'decr') {
            dispatch(changeParamsPacks({sortPacks: sortPacks.DESC_UPDATE}))
            dispatch(changeStatusSort(cell, regulator))
        } else {
            dispatch(changeParamsPacks({sortPacks: sortPacks.INCR_UPDATE}))
            dispatch(changeStatusSort(cell, regulator))
        }
    }

    if (cell === 'created') {
        if (regulator === 'decr') {
            dispatch(changeParamsPacks({sortPacks: sortPacks.DESC_CREATED}))
            dispatch(changeStatusSort(cell, regulator))
        } else {
            dispatch(changeParamsPacks({sortPacks: sortPacks.INCR_CREATED}))
            dispatch(changeStatusSort(cell, regulator))
        }
    }

    if (cell === 'updateCard') {
        if (regulator === 'decr') {
            dispatch(changeParamsCards({sortCards: sortPacks.DESC_UPDATE, cardsPack_id: id}))
            dispatch(changeStatusSort(cell, regulator))
        } else {
            dispatch(changeParamsCards({sortCards: sortPacks.INCR_UPDATE, cardsPack_id: id}))
            dispatch(changeStatusSort(cell, regulator))
        }
    }
};


import React, {useState} from 'react'
import {NameCellType, SortType} from "../TypeForSort";
import {sortHelperUtils} from "../utils/sortHelper-utils";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import IconButton from '@mui/material/IconButton/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type SortButtonType = {
    nameHeaderCell: NameCellType,
}

export const SortButton = ({nameHeaderCell}: SortButtonType) => {

    const dispatch = useAppDispatch()
    const sortStatus = useAppSelector(state => state.app.statusSort)
    const regulator = useAppSelector(state => state.app.regulator)
    const id = useAppSelector(state => state.cards.params.cardsPack_id)

    const initial = nameHeaderCell === sortStatus ? regulator : 'decr'

    const [sort, setSort] = useState<SortType>(initial)

    const onClickHandler = (value: SortType) => {
        setSort(value)
        sortHelperUtils(value, nameHeaderCell, dispatch, id)
    }

    return (
        <>
            {sort === 'decr'
                ?
                <IconButton aria-label="arrow-down" onClick={() => onClickHandler('incr')}>
                    <ArrowDropDownIcon color='info'/></IconButton>
                :
                <IconButton  aria-label="arrow-down" onClick={() => onClickHandler('decr')}>
                    <ArrowDropUpIcon color='info'/></IconButton>
            }
        </>
    );
};

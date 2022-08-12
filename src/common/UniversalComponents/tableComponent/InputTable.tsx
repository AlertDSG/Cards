import React, {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import {useDebounce} from "../../hooks/useDebounce";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {changeParamsPacks} from "../../../features/packs/packs-reducer";
import {changeParamsCards} from "../../../features/cards/cards-reducer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton/IconButton";

type PageType = 'packs' | 'cards'

type InputPropsType = {
    page: PageType
}

export const InputTable = ({page}: InputPropsType) => {

    const id = useAppSelector((state) => state.cards.params.cardsPack_id)

    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>('')
    const debounce = useDebounce<string>(value, 1000)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (debounce && page === 'packs') {
            dispatch(changeParamsPacks({packName: value}))
        } else if (debounce && page === 'cards') {
            dispatch(changeParamsCards({cardsPack_id: id, cardQuestion: value}))
        }
    }, [debounce])

    return <> <TextField value={value} fullWidth id="fullWidth" placeholder={'Search...'} onChange={onChangeHandler}/>
        <IconButton
            onClick={() => {
                if (page === 'packs') {
                    dispatch(changeParamsPacks({packName: undefined}))
                } else if (page === 'cards') {
                    dispatch(changeParamsCards({cardsPack_id: id, cardQuestion: undefined}))
                }
            }}
            title={'clean search'}>
            <CloseIcon/>
        </IconButton>
    </>
};


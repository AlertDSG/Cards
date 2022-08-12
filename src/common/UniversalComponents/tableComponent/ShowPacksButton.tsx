import React, {useState} from 'react';
import {Button, ButtonGroup} from '@mui/material';

type ShowPropsType = {
    paramsId: undefined | string
    userId: string
    callback: (value: undefined | string) => void
}

export const ShowPacksButton = ({callback, userId, paramsId}: ShowPropsType) => {
     const initial =  paramsId === userId ? userId : undefined
    const [filterPacks, setFilterPacks] = useState<string | undefined>(initial)

    const onClickHandler = (value: undefined | string) => {
        callback(value)
        setFilterPacks(value)
    }
    console.log(filterPacks)

    return (
        <div>
            <h2 style={{margin: '30px 0'}}>Show packs cards</h2>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button color={filterPacks ===  userId ? "primary" :"inherit"} onClick={()=>onClickHandler(userId)}>My</Button>
                <Button color={!filterPacks ? "primary" :"inherit"}  onClick={()=>onClickHandler(undefined)}>All</Button>
            </ButtonGroup>
        </div>
    );
};


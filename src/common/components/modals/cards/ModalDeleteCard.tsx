import React, {useState} from 'react';
import {WrapperModal} from "../WrapperModal";
import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {Delete} from "@mui/icons-material";
import {useAppDispatch} from "../../../hooks/hooks";
import {removeCard} from "../../../../features/cards/cards-reducer";
import style from "../Modals.module.css"


type ModalType = {
    isOpen: boolean,
    id: string,
    callback: () => void
}


export const ModalDeleteCard = ({isOpen, id, callback}: ModalType) => {

    const dispatch = useAppDispatch()

    const deleteCardHandler = () => {
        dispatch(removeCard(id))
    }

    return (
        <>
            <WrapperModal isOpen={isOpen} callback={callback}>
                <div className={style.header}>
                    <h2>Delete Card</h2>
                    <IconButton onClick={() => callback()}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <div className={style.text}>
                    <h3>Do you want to remove <span>This Card</span></h3>
                    <h3>All cards will be deleted</h3>
                </div>
                <Stack className={style.doubleBtn} direction="row" spacing={2}>
                    <Button onClick={() => callback()} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={deleteCardHandler} variant="contained" endIcon={<Delete/>}>
                        Delete
                    </Button>
                </Stack>
            </WrapperModal>
        </>
    );
};


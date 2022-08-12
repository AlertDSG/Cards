import React from 'react';
import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {WrapperModal} from "../WrapperModal";
import {Delete} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {removePack} from "../../../../features/packs/packs-reducer";
import style from "../Modals.module.css"

type ModalType = {
    value: boolean
    callback: () => void
}

export const ModalDeletePack = ({value, callback}: ModalType) => {


    const dispatch = useAppDispatch()
    const id = useAppSelector((state) => state.packs.packId)
    const cardPacks = useAppSelector((state) => state.packs.cardPacks)

    const pack = cardPacks.find(c => c._id === id)

    const removePackHandler = () => {
        dispatch(removePack(id))
        callback()
    }

    return (
        <WrapperModal isOpen={value} callback={callback}>
            <div className={style.header}>
                <h2>Delete Pack</h2>
                <IconButton onClick={() => callback()}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div className={style.text}>
                <h3 className={style.title}>Do you want to remove <span className={style.name}>{pack && pack.name}</span>?</h3>
                <span>All cards will be deleted</span>
            </div>
            <Stack className={style.doubleBtn} direction="row" spacing={2}>
                <Button onClick={() => callback()} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={removePackHandler} variant="contained" endIcon={<Delete/>}>
                    Delete
                </Button>
            </Stack>
        </WrapperModal>
    );
};
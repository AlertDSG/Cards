import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {InputModal} from "../InputModal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {WrapperModal} from "../WrapperModal";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {updateUserPack} from "../../../../features/packs/packs-reducer";
import {CheckboxComponent} from "../../../UniversalComponents/CheckboxComponent";
import style from "../Modals.module.css"

type ModalType = {
    value: boolean
    callback: () => void
}

export const ModalUpdatePack = ({value, callback}: ModalType) => {

    const [text, setText] = useState<string>('')
    const [isPrivate, setIsPrivate] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const id = useAppSelector((state) => state.packs.packId)
    const cardPacks = useAppSelector((state) => state.packs.cardPacks)

    const pack = cardPacks.find(c => c._id === id)

    const updatePack = () => {
        dispatch(updateUserPack({_id: id, name: text, private: isPrivate}))
        callback()
    }

    return (
        <WrapperModal isOpen={value} callback={() => callback()}>
            <div className={style.header}>
                <h2>Edite pack</h2>
                <IconButton onClick={() => callback()}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <InputModal text={pack && pack.name} callback={(text) => setText(text)} label={'Name pack'}/>
            <div className={style.checked}>
                <CheckboxComponent callback={(value) => setIsPrivate(value)}/>
            </div>
            <Stack className={style.doubleBtn} direction="row" spacing={2}>
                <Button onClick={() => callback()} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={updatePack} variant="contained">
                    Save
                </Button>
            </Stack>
        </WrapperModal>
    );
};

import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {InputModal} from "../InputModal";
import Button from "@mui/material/Button";
import {WrapperModal} from "../WrapperModal";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {changeCard} from "../../../../features/cards/cards-reducer";
import style from "../Modals.module.css"
import Stack from "@mui/material/Stack";

type ModalType = {
    modalUpdate: boolean
    id: string
    callback: () => void
}

export const ModalEditCard = ({modalUpdate, id, callback}: ModalType) => {

    const oldObjCard = useAppSelector((state) => state.cards.cards.find(c => c._id === id))

    const [question, setQuestion] = useState<string>(oldObjCard ? oldObjCard.question : '')
    const [answer, setAnswer] = useState<string>(oldObjCard ? oldObjCard.answer : '')

    const dispatch = useAppDispatch()

    const editeCard = () => {
        dispatch(changeCard({_id: id, question, answer}))
        callback()
    }

    return (
        <WrapperModal isOpen={modalUpdate} callback={callback}>
            <div className={style.header}>
                <h2>Add new card</h2>
                <IconButton onClick={callback}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div className={style.inputs}>
                <InputModal text={question} label={'Question'} callback={(value) => setQuestion(value)}/>
                <InputModal text={answer} label={'Answer'} callback={(value) => setAnswer(value)}/>
            </div>
            <Stack className={style.doubleBtn} direction="row" spacing={2}>
                <Button onClick={callback} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={editeCard} variant="contained">
                    Save
                </Button>
            </Stack>
        </WrapperModal>
    );
};

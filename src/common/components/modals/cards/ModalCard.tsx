import React, {useState} from 'react';
import {WrapperModal} from "../WrapperModal";
import {InputModal} from "../InputModal";
import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import {UniversalButton} from "../../../UniversalComponents/UniversalButton";
import {addNewCard} from "../../../../features/cards/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import style from "../Modals.module.css"
import Stack from "@mui/material/Stack";

export const ModalCard = () => {

    const dispatch = useAppDispatch()

    const cardsPack_id = useAppSelector((state) => state.cards.params.cardsPack_id)

    const [addModal, setAddModal] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const addCard = () => {
        dispatch(addNewCard({cardsPack_id, question, answer}))
        setAddModal(false)
    }
    return (
        <><UniversalButton callback={() => setAddModal(true)} name={'Add new card'}/>
            {addModal && <WrapperModal isOpen={addModal} callback={(value) => setAddModal(value)}>
                <div className={style.header}>
                    <h2>Add new card</h2>
                    <IconButton onClick={() => setAddModal(false)}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <div className={style.inputs}>
                    <InputModal text={question} label={'Question'} callback={(value) => setQuestion(value)}/>
                    <InputModal text={answer} label={'Answer'} callback={(value) => setAnswer(value)}/>
                </div>
                <Stack className={style.doubleBtn} direction="row" spacing={2}>
                    <Button onClick={() => setAddModal(false)} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={addCard} variant="contained">
                        Save
                    </Button>
                </Stack>
            </WrapperModal>
            }
        </>
    );
};

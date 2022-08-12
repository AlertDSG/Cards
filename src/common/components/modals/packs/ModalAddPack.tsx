import React, {useState} from 'react';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {InputModal} from "../InputModal";
import {WrapperModal} from '../WrapperModal';
import {createPack} from '../../../../features/packs/packs-reducer';
import {useAppDispatch} from '../../../hooks/hooks';
import {UniversalButton} from '../../../UniversalComponents/UniversalButton';
import {CheckboxComponent} from '../../../UniversalComponents/CheckboxComponent';
import style from '../Modals.module.css'


export const ModalAddPack = () => {

    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [isPrivate, setIsPrivate] = useState<boolean>(false)

    const addPack = () => {
        dispatch(createPack({name: text, private: isPrivate}))
        setIsOpen(false)
    }

    return (
        <>
            <UniversalButton name={'Add pack'} callback={() => setIsOpen(true)}/>
            {isOpen && <WrapperModal nameBtn={'Add pack'} isOpen={isOpen} callback={(value) => setIsOpen(value)}>
                <div className={style.header}>
                    <h2>Add new pack</h2>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon/>
                    </IconButton>
                </div>

                <InputModal callback={(text) => setText(text)} label={'Add new pack'}/>
                <div className={style.checked}>
                    <CheckboxComponent callback={(value) => setIsPrivate(value)}/>
                </div>
                <Stack direction="row" spacing={2} className={style.doubleBtn}>
                    <Button onClick={() => setIsOpen(false)} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={addPack} variant="contained">
                        Save
                    </Button>
                </Stack>
            </WrapperModal>}
        </>
    );
};
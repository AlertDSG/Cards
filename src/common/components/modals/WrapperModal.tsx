import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

type WrapperModal = {
    children: React.ReactNode
    nameBtn?: string
    isOpen: boolean
    callback?: (value: boolean) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const WrapperModal = ({children, isOpen, callback}: WrapperModal) => {

    const [open, setOpen] = React.useState(isOpen);

    const handleClose = () => {
        setOpen(false)
        callback && callback(false)
    }


    return (
        <div>
            <Modal
                keepMounted
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}

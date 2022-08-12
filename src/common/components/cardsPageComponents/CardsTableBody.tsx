import React from 'react';

import {useAppSelector} from "../../hooks/hooks";

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {Rating} from '@mui/material';
import IconButton from "@mui/material/IconButton/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {formDate} from "../../utils/formDate-utils";

type CardsTableBodyType = {
    callbackUpdate?: (id: string) => void
    callbackDelete?: (id: string) => void
}

export const CardsTableBody = ({callbackUpdate, callbackDelete}: CardsTableBodyType) => {

    const cards = useAppSelector((state) => state.cards.cards)
    const userId = useAppSelector((state) => state.auth.user._id)


    const deleteCard = (id: string) => {
        callbackDelete && callbackDelete(id)
    }
    const updateCard = (id: string) => {
        callbackUpdate && callbackUpdate(id)
    }

    return <TableBody>
        {cards.map((card) => (
            <TableRow
                key={card._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell align="center">{card.question}</TableCell>
                <TableCell align="center">{card.answer}</TableCell>
                <TableCell align="center">{formDate(card.updated)}</TableCell>
                <TableCell align="center">
                    <Rating name="card-grade" value={card.grade} readOnly/>
                </TableCell>
                <TableCell align="center">
                    {userId === card.user_id && <> <IconButton aria-label="edit"
                                                               onClick={() => updateCard(card._id)}><EditIcon
                        color='info'/></IconButton>
                        <IconButton aria-label="delete" onClick={() => deleteCard(card._id)}><DeleteForeverIcon
                            color='error'/></IconButton>
                    </>}
                </TableCell>
            </TableRow>
        ))}
    </TableBody>

}
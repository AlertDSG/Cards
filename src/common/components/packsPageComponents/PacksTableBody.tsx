import React from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton/IconButton';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setPackId} from "../../../features/packs/packs-reducer";
import {changeParamsCards, setNamePack} from "../../../features/cards/cards-reducer";
import {setLearnCardsId} from "../../../features/learn/learn-reducer";
import {formDate} from "../../utils/formDate-utils";

type PropsType = {
    callbackUpdate?: () => void
    callbackDelete?: () => void
}

export const PacksTableBody = ({callbackUpdate, callbackDelete}: PropsType) => {

    const dispatch = useAppDispatch()

    const packs = useAppSelector((state) => state.packs.cardPacks)
    const userId = useAppSelector(state => state.auth.user._id)

    const deletePack = (id: string) => {
        dispatch(setPackId(id))
        callbackDelete && callbackDelete()
    }
    const updatePack = (id: string) => {
        dispatch(setPackId(id))
        callbackUpdate && callbackUpdate()
    }
    const cardsPageHandler = (id: string, name: string) => {
        dispatch(changeParamsCards({cardsPack_id: id}))
        dispatch(setNamePack(name))
    }

    return (
        <>
            <TableBody>
                {packs.map((pack) => (
                    <TableRow
                        key={pack._id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell align={'center'}>
                            <Link onClick={() => cardsPageHandler(pack._id, pack.name)} to={'/cards'}>{pack.name}</Link>
                        </TableCell>
                        <TableCell align="center">{pack.cardsCount}</TableCell>
                        <TableCell align="center">{formDate(pack.updated)}</TableCell>
                        <TableCell align="center">{pack.user_name}</TableCell>
                        <TableCell align="center">
                            <Link to={'/learn'}>
                                <IconButton onClick={() => dispatch(setLearnCardsId(pack._id, pack.name, pack.cardsCount))}
                                            aria-label="learn"><LocalLibraryIcon color='info'/></IconButton>
                            </Link>
                            {userId === pack.user_id && <span>
                            <IconButton aria-label="edit" onClick={() => updatePack(pack._id)}><EditIcon color='info'/></IconButton>
                            <span> </span>
                            <IconButton aria-label="delete" onClick={() => deletePack(pack._id)}><DeleteForeverIcon
                                color='error'/></IconButton>
                        </span>}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
}
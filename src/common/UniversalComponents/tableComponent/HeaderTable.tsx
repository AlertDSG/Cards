import React from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import {SortButton} from '../SortButton';
import {NameCellType} from '../../TypeForSort';
import styles from './HeaderTable.module.css'
import {useAppSelector} from '../../hooks/hooks';

type HeaderType = {
    data: Array<{ id: number, name: string, isDone: boolean, sortName: NameCellType }>
    changeIsDoneToggle: (columnName: string, isDone: boolean) => void
}

export const HeaderTable = (props: HeaderType) => {

const sortStatusCell = useAppSelector(state => state.app.statusSort)

    const headerRow = props.data.map((a) => {

        return (

            <TableCell align={'center'} key={a.id} style={{height: '75px', width: '100px'}}
                       onMouseEnter={() => {
                           props.changeIsDoneToggle(a.name, true)
                       }}
                        onMouseLeave={() => {
                            props.changeIsDoneToggle(a.name, false)
                       }}
            >
                {a.name} {(a.isDone || sortStatusCell === a.sortName) && a.name !== 'Action' && <SortButton nameHeaderCell={a.sortName}/>}
            </TableCell>

        )
    })

    return (
        <TableHead className={styles.body}>
            <TableRow>
                {headerRow}
            </TableRow>
        </TableHead>
    );
};
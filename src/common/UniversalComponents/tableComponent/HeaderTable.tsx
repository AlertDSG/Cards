import React from 'react';

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import {SortButton} from "../SortButton";
import {NameCellType} from "../../TypeForSort";
import style from "./HeaderTable.module.css"

type HeaderType = {
    data: Array<{ name: string, isDone: boolean, sortName: NameCellType }>
}

export const HeaderTable = (props: HeaderType) => {

    const headerRow = props.data.map((a, i) => {
        return (
            <TableCell align={'center'}
                       key={i}>
                {a.name} {a.isDone && <SortButton nameHeaderCell={a.sortName}/>}
            </TableCell>
        )
    })

    return (
        <TableHead className={style.body}>
            <TableRow>
                {headerRow}
            </TableRow>
        </TableHead>
    );
};
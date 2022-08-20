import React, {useState} from 'react';
import {PacksTableBody} from "./PacksTableBody";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {HeaderTable} from "../../UniversalComponents/tableComponent/HeaderTable";
import TableContainer from "@mui/material/TableContainer";
import {NameCellType} from "../../TypeForSort";
import {PaginationComponent} from "../../UniversalComponents/tableComponent/Pagination";
import {PageCount} from "../../UniversalComponents/tableComponent/PageCount";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {changeParamsPacks} from "../../../features/packs/packs-reducer";
import {ModalAddPack} from "../modals/packs/ModalAddPack";
import {ModalUpdatePack} from "../modals/packs/ModalUpdatePack";
import {ModalDeletePack} from "../modals/packs/ModalDeletePack";

export type nameColumnType = {
    id: number,
    name: string,
    isDone: boolean,
    sortName: NameCellType
}

/*const nameColumn: Array<nameColumnType> = [
    {name: 'Pack Name', isDone: true, sortName: 'packName'},
    {name: 'Cards', isDone: true, sortName: 'cards'},
    {name: 'Last Updated', isDone: true, sortName: 'update'},
    {name: 'Created by', isDone: true, sortName: 'created'},
    {name: 'Action', isDone: false, sortName: 'action'},
]*/

export const PacksTable = () => {

    const [modalUpdate, setModalUpdate] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<boolean>(false)
    const [nameColumn, setNameColumn] = useState<Array<nameColumnType>>([
        {id: 1, name: 'Pack Name', isDone: false, sortName: 'packName'},
        {id: 2, name: 'Cards', isDone: false, sortName: 'cards'},
        {id: 3, name: 'Last Updated', isDone: false, sortName: 'update'},
        {id: 4, name: 'Created by', isDone: false, sortName: 'created'},
        {id: 5, name: 'Action', isDone: false, sortName: 'action'},
    ])

    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const defaultPage = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const paramsPage = useAppSelector(state => state.packs.params.page)
    const paramsPageCount = useAppSelector(state => state.packs.params.pageCount)

    const changePageNumberHandler = (page: number) => {
        dispatch(changeParamsPacks({page}))
    }
    const changePageSizeHandler = (pageCount: number) => {
        dispatch(changeParamsPacks({pageCount}))
    }

    const page = paramsPage ? paramsPage : defaultPage
    const pageSize = paramsPageCount ? paramsPageCount : pageCount
    const pageTotalCount = cardPacksTotalCount ? Math.ceil(cardPacksTotalCount / pageSize) : 0

    const changeIsDoneToggle =  (columnName: string, isDone: boolean) => {
        setNameColumn (nameColumn.map(c => c.name === columnName ? {...c, isDone} : {...c, isDone: false})
        )
    }


    console.log(pageTotalCount, cardPacksTotalCount, pageCount)

    return (
        <>
            {modalUpdate && <ModalUpdatePack callback={()=>setModalUpdate(false)} value={modalUpdate}/>}
            {modalDelete && <ModalDeletePack callback={()=>setModalDelete(false)} value={modalDelete}/>}
            {packs.length > 0
                ?
                <div>
                    < TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <HeaderTable data={nameColumn} changeIsDoneToggle={changeIsDoneToggle}/>
                            <PacksTableBody callbackUpdate={()=>setModalUpdate(true)} callbackDelete={()=>setModalDelete(true)}/>
                        </Table>
                    </TableContainer>
                    <div style={{display: "flex", marginTop: " 20px", alignItems: "center", gap: "20px"}}>
                        <PaginationComponent pageCount={pageTotalCount} page={page} callback={changePageNumberHandler}/>
                        <PageCount callback={changePageSizeHandler} pageCount={pageSize}/>
                    </div>
                </div>
                :
                <div>
                    <h1 style={{marginTop: '50px'}}>You don't have pack. Click add new pack</h1>
                    <ModalAddPack/>
                </div>
            }
        </>

    );
};

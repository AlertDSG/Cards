import React, {useState} from 'react';
import {HeaderTable} from "../../UniversalComponents/tableComponent/HeaderTable";
import {CardsTableBody} from "./CardsTableBody";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {PageCount} from "../../UniversalComponents/tableComponent/PageCount";
import {PaginationComponent} from "../../UniversalComponents/tableComponent/Pagination";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {changeParamsCards} from "../../../features/cards/cards-reducer";
import {ModalEditCard} from "../modals/cards/ModalEditCard";
import {ModalDeleteCard} from "../modals/cards/ModalDeleteCard";
import {nameColumnType} from '../packsPageComponents/PacksTable';


/*const nameColumn: Array<{ name: string, isDone: boolean, sortName: NameCellType }> = [
    {name: 'Question', isDone: false, sortName: 'updateCard'},
    {name: 'Answer', isDone: false, sortName: 'updateCard'},
    {name: 'Last Updated', isDone: true, sortName: 'updateCard'},
    {name: 'Grade', isDone: false, sortName: 'updateCard'},
    {name: 'Action', isDone: false, sortName: 'updateCard'},
]*/

export const CardsTable = () => {

    const [updateId, setUpdateId] = useState<string>('')
    const [modalUpdate, setModalUpdate] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<boolean>(false)
    const [nameColumn, setNameColumn] = useState<Array<nameColumnType>>([
        {id: 1, name: 'Question', isDone: false, sortName: 'Question'},
        {id: 2, name: 'Answer', isDone: false, sortName: 'Answer'},
        {id: 3, name: 'Last Updated', isDone: true, sortName: 'updateCard'},
        {id: 4, name: 'Grade', isDone: false, sortName: 'Grade'},
        {id: 5, name: 'Action', isDone: false, sortName: 'Action'},
    ])

    const dispatch = useAppDispatch()

    const pageCount = useAppSelector(state => state.cards.pageCount)
    const page = useAppSelector(state => state.cards.page)
    const cardsPack_id = useAppSelector(state => state.cards.params.cardsPack_id)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const cards = useAppSelector((state) => state.cards.cards)


    const changePageNumberHandler = (page: number) => {
        dispatch(changeParamsCards({page, cardsPack_id}))
    }

    const changePageSizeHandler = (pageCount: number) => {
        dispatch(changeParamsCards({pageCount, cardsPack_id}))
    }

    const pageTotalCount = Math.ceil(cardsTotalCount / pageCount)

    const changeIsDoneToggle =  (columnName: string, isDone: boolean) => {
        console.log(isDone)
        setNameColumn (nameColumn.map(c => c.name === columnName ? {...c, isDone} : {...c, isDone: false})
        )
    }

    return (
        <> {modalUpdate &&
            <ModalEditCard callback={() => setModalUpdate(false)} id={updateId} modalUpdate={modalUpdate}/>}
            {modalDelete && <ModalDeleteCard id={updateId} callback={() => {
                setModalDelete(false)
            }} isOpen={modalDelete}/>}
            {cards.length > 0
                ? < div style={{marginTop: '30px'}}>
                    < TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <HeaderTable data={nameColumn} changeIsDoneToggle={changeIsDoneToggle} />
                            <CardsTableBody
                                callbackDelete={(id) => {
                                    setUpdateId(id)
                                    setModalDelete(true)

                                }}
                                callbackUpdate={(id) => {
                                    setUpdateId(id)
                                    setModalUpdate(true)
                                }}/>
                        </Table>
                    </TableContainer>

                    <div style={{display: "flex", marginTop: " 20px", alignItems: "center", gap: "20px"}}>
                        <PaginationComponent pageCount={pageTotalCount} page={page} callback={changePageNumberHandler}/>
                        <PageCount callback={changePageSizeHandler} pageCount={pageCount}/>
                    </div>
                </div>
                : <h1 style={{marginTop: '50px'}}>This pack is empty</h1>
            }
        </>
    );
};

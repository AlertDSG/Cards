import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {setCards} from "./cards-reducer";
import style from "./Cards.module.css"
import {CardsTable} from "../../common/components/cardsPageComponents/CardsTable";
import {CardsHeader} from "../../common/components/cardsPageComponents/CardsHeader";
import {ArrowLeft} from "@mui/icons-material";
import {Link} from "react-router-dom";
import s from "../../common/components/learnPageComponents/ShowPage.module.css"

export const Cards = () => {

    const dispatch = useAppDispatch()

    const params = useAppSelector(state => state.cards.params)
    const status = useAppSelector(state => state.app.status)
    const packName = useAppSelector(state => state.cards.packName)

    useEffect(() => {
        dispatch(setCards())
    }, [params, dispatch])

    if (status === 'loading') {
        return <h1 style={{textAlign: 'center', marginTop: '150px'}}>Loading...</h1>
    }

    return (
        <>
            <Link to={'/packs'} className={s.backArrow}><ArrowLeft/> Back to Pack List</Link>
            <h2 className={style.title}>Pack Name: {packName}</h2>
            <div className={style.bodyPage}>
                <CardsHeader/>
                <CardsTable/>
            </div>
        </>
    );
};



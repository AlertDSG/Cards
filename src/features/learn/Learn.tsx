import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {fetchLearnCards, updateGradeLearnCards} from "./learn-reducer";
import ShowLearnPage from "../../common/components/learnPageComponents/ShowLearnPage";
import {CardType} from "../cards/cardsAPI";
import {Link, Navigate} from "react-router-dom";
import {getRandomCard} from "../../common/utils/getRandomCards";
import {QuestionsForLearnPage} from "../../common/components/learnPageComponents/QuestionsForLearnPage";
import style from "../../common/components/learnPageComponents/ShowPage.module.css";
import {ArrowLeft} from "@mui/icons-material";

export const Learn = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchLearnCards())
    },[])

    const cards = useAppSelector((store) => store.learn.cards);

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [card, setCard] = useState<CardType>(getRandomCard(cards));

    const onNext = (grade: number) => {
        setIsChecked(false);
        setCard(getRandomCard(cards))
        dispatch(updateGradeLearnCards({grade, card_id: card._id}))
    }

    if (cards.length === 0) return <Navigate to={'/packs'}/>


    return (
        <div>
            <Link to={'/packs'} className={style.backArrow}><ArrowLeft/> Back to pack list</Link>
            {!isChecked && <>
                <QuestionsForLearnPage question={card.question} callback={() => setIsChecked(true)}/>

            </>}
            {isChecked &&<ShowLearnPage onNext={onNext} card={card}/>}
        </div>
    );
};
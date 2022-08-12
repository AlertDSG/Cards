import React from 'react';
import {Wrapper} from "../../UniversalComponents/Wrapper";
import style from "./QuestionsForLearnPage.module.css";
import {useAppSelector} from "../../hooks/hooks";
import {Link} from "react-router-dom";

type QuestionType = {
    question: string
    callback: () => void
}

export const QuestionsForLearnPage = ({question, callback}: QuestionType) => {

    const packName = useAppSelector((store) => store.learn.packName);

    return (
        <div>
            <h1 className={style.learn}>Learn "{packName}"</h1>
            <Wrapper>
                <div className={style.container}>
                    <h4 className={style.question}>Question: {question}</h4>
                    <div className={style.buttons}>
                        <Link to={'/packs'}>
                            <button className={style.button}>
                                Cancel
                            </button>
                        </Link>
                        <button onClick={callback} className={style.button}>
                            Show answer
                        </button>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};




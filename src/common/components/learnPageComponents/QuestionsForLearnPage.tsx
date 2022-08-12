import React from 'react';
import {Wrapper} from "../../UniversalComponents/Wrapper";
import style from "./QuestionsForLearnPage.module.css";

export const QuestionsForLearnPage = () => {
    return (
        <div>
            <Wrapper>
                <div className={style.container}>
                    <h1 className={style.learn}>Learn "Pack Name"</h1>
                    <h4 className={style.question}>Question: "How "This" works in JavaScript?"</h4>

                    <div className={style.buttons}>
                        <button className={style.button}>
                            Cancel
                        </button>
                        <button className={style.button}>
                            Show answer
                        </button>
                    </div>
                </div>

            </Wrapper>
        </div>
    );
};




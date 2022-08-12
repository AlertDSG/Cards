import React, {ChangeEvent, useState} from 'react';
import style from './ShowPage.module.css'
import {Wrapper} from "../../UniversalComponents/Wrapper";
import {CardType} from "../../../features/cards/cardsAPI";
import {useAppSelector} from "../../hooks/hooks";
import {useNavigate} from "react-router-dom";


const data = [
    {text: 'Did not know', id: 1},
    {text: 'Forgot', id: 2},
    {text: 'A lot of thought', id: 3},
    {text: 'Confused', id: 4},
    {text: 'Knew the answer', id: 5},
]

type ShowType = {
    card: CardType
    onNext: (grade: number) => void
}

const ShowLearnPage = ({card, onNext}: ShowType) => {

    const navigate = useNavigate()

    const packName = useAppSelector((store) => store.learn.packName);

    const [grade, setGrade] = useState<number>(5)

    const onSubmitHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setGrade(+event.currentTarget.value)
    }

    const onClickHandler = () => {
        onNext(grade)
    }

    const backNavigateHandler = () => {
        navigate('/packs')
    }

    return (
        <div>
            <h1 className={style.learn}>Learn "{packName}"</h1>
            <Wrapper>
                <div className={style.container}>
                    <h4 className={style.question}>Question: {card.question}</h4>
                    <h4 className={style.answer}>Answer: {card.answer}</h4>
                    <h4 className={style.rate}>Rate yourself:</h4>
                    <ul className={style.list}>
                        {
                            data.map(d => <li key={d.id}>
                                <input checked={d.id == grade} type="radio" name={'name'}
                                       value={d.id}
                                       onChange={onSubmitHandler}/>
                                <span>  {d.text}</span>
                            </li>)
                        }
                    </ul>
                    <div className={style.buttons}>
                        <button onClick={backNavigateHandler} className={style.button}>
                            Cancel
                        </button>
                        <button type={"submit"} className={style.button} onClick={onClickHandler}>
                            Next
                        </button>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
};

export default ShowLearnPage;
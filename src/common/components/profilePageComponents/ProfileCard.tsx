import React, {useCallback} from 'react';
import style from "./ProfileCard.module.css";
import Avatar from "../../../assets/Male-Avatar.png";
import {EditableSpan} from "./EditableProfileSpan";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {logoutThunkAC} from "../../../features/profile/profile-reducer";
import {editNameThunkAC} from "../../../features/auth/auth-reducer";
import {UniversalButton} from "../../UniversalComponents/UniversalButton";

export const ProfileCard = () => {

    const name = useAppSelector(state => state.auth.user.name)
    const avatar = useAppSelector(state => state.auth.user.avatar)
    const email = useAppSelector(state => state.auth.user.email)
    const publicCardPacksCount = useAppSelector(state => state.auth.user.publicCardPacksCount)

    const dispatch = useAppDispatch();

    const logoutHandler = useCallback(() => {
        dispatch(logoutThunkAC())
    }, [dispatch])

    const changeNameHandler = useCallback((name: string) => {
        dispatch(editNameThunkAC(name))
    }, [dispatch])

    return (
        <div style={{textAlign: 'center'}}>
            <div className={style.personal}>
                <h1>Personal information</h1>
            </div>

            <img className={style.avatar}
                 src={avatar ? avatar : Avatar}
                 alt="avatar"
            />

            <li className={style.text}>
                <EditableSpan className={style.item} name={name} callback={changeNameHandler}/>
                <h2 className={style.item}>{email}</h2>
                <h2 className={style.item}> Packs: {publicCardPacksCount}</h2>
            </li>
            <UniversalButton name={'LOG OUT'} callback={logoutHandler}/>
        </div>
    );
};

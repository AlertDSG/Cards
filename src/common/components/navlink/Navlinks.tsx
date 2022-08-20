import React from 'react';
import {NavLink} from 'react-router-dom'
import s from './Navlihks.module.css'

export const Navlinks = () => {
    return (
        <nav style={{position: 'absolute', bottom: '0', left: '20px'}}>
            <ul className={s.body}>
                <li><NavLink to='/login' className={navData => navData.isActive ? s.active : s.item}>
                    Login_
                </NavLink>
                </li>
                <li><NavLink to='/registration' className={navData => navData.isActive ? s.active : s.item}>
                    Registration_
                </NavLink>
                </li>
                <li><NavLink to='/set-new-password' className={navData => navData.isActive ? s.active : s.item}>
                    New Password_
                </NavLink>
                </li>
                <li><NavLink to='/forgot' className={navData => navData.isActive ? s.active : s.item}>
                    Forgot Password_
                </NavLink>
                </li>
                <li><NavLink to='/profile' className={navData => navData.isActive ? s.active : s.item}>
                    Profile_
                </NavLink>
                </li>
                <li><NavLink to='/packs' className={navData => navData.isActive ? s.active : s.item}>
                    Packs_
                </NavLink>
                </li>
                <li><NavLink to='/cards' className={navData => navData.isActive ? s.active : s.item}>
                    Cards
                </NavLink>
                </li>
            </ul>

        </nav>
    );
};

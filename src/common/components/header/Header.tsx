import React from 'react';
import style from './Header.module.css';
import {useAppSelector} from '../../hooks/hooks';
import { Link } from 'react-router-dom';

export const Header = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    return (

        <div>
            <div className={style.header}>
                <h1>IT-Developers</h1>
                <div >
                    {
                        isLoggedIn
                            ?
                            <Link to={'/packs' }>
                                <span style={{paddingRight: '50px'}}>Packs list</span>
                            </Link>
                            :
                            <Link to={'/login'}>
                                <span style={{display:'inline-block', border:'1px solid', padding: '5px 10px'}}>Sign in</span>
                            </Link>
                    }
                </div>
            </div>
        </div>
    );
};

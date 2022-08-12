import React from 'react';

import '../App.css';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {meThunkAC} from "../features/auth/auth-reducer";
import {ErrorSnackbar} from "../common/UniversalComponents/ErrorSnackbar/ErrorSnackbar";
import {Header} from "../common/components/header/Header";
import {RoutesForProject} from "../common/components/routes/RoutesForProject";
import {Navlinks} from "../common/components/navlink/Navlinks";
import {CircularProgress, LinearProgress} from "@mui/material";
import style from "./App.module.css"

function App() {

    const dispatch = useAppDispatch();

    const initial = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        !isLoggedIn && dispatch(meThunkAC())
    }, [])

    if (initial) {
        return <CircularProgress/>
    }

    return (
        <div>
            <Header/>
            {status === 'loading' && <LinearProgress/>}
            <div className={style.container}>
                <ErrorSnackbar/>
                <RoutesForProject/>
            </div>
            <Navlinks/>
        </div>
    );
}

export default App;

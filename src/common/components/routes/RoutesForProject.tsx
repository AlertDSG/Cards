import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../../features/auth/components/Login";
import {Registration} from "../../../features/auth/components/Registration";
import {ForgotPassword} from "../../../features/auth/components/ForgotPassword";
import {NewPassword} from "../../../features/auth/components/NewPassword";
import {Profile} from "../../../features/profile/Profile";
import {Error404} from "../../Error-404";
import {Packs} from "../../../features/packs/Packs";
import {Cards} from "../../../features/cards/Cards";
import {Learn} from "../../../features/learn/Learn";

export const RoutesForProject = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/login'}/>}/>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'registration'} element={<Registration/>}/>
            <Route path={'forgot'} element={<ForgotPassword/>}/>
            <Route path={'set-new-password/:token'} element={<NewPassword/>}/>
            <Route path={'profile'} element={<Profile/>}/>
            <Route path={'packs'} element={<Packs/>}/>
            <Route path={'cards'} element={<Cards/>}/>
            <Route path={'learn'} element={<Learn/>}/>
            <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
            <Route path={'/404'} element={<Error404/>}/>
        </Routes>
    );
};

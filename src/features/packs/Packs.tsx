import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {setPacks} from "./packs-reducer";
import {Navigate} from "react-router-dom";
import {PacksTable} from "../../common/components/packsPageComponents/PacksTable";
import {PacksHeader} from "../../common/components/packsPageComponents/PacksHeader";
import {QuestionsForLearnPage} from "../../common/components/learnPageComponents/QuestionsForLearnPage";

export const Packs = () => {
    // const [searchParams, setSearchParams] = useSearchParams()
    // console.log(searchParams)
    // console.log(Object.fromEntries(searchParams))

    const dispatch = useAppDispatch()

    const status = useAppSelector(state => state.app.status)
    const params = useAppSelector(state => state.packs.params)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(setPacks())
    }, [params])//  в зависимости идут фильтрации, пагинации, и т.д.

    if (status === 'loading') {
        return <h1 style={{textAlign: 'center', marginTop: '150px'}}>Loading...</h1>
    }
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (

        <div style={{
            maxWidth: '1250px',
            padding: '50px 20px',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto'
        }}>

            <PacksHeader/>
            <PacksTable/>

        </div>
    );
};


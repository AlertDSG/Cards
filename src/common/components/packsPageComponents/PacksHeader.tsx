import React from 'react';
import {ShowPacksButton} from "../../UniversalComponents/tableComponent/ShowPacksButton";
import {RangeTable} from "../../UniversalComponents/tableComponent/RangeTable";
import {InputTable} from "../../UniversalComponents/tableComponent/InputTable";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {changeParamsPacks} from "../../../features/packs/packs-reducer";
import {ModalAddPack} from "../modals/packs/ModalAddPack";

export const PacksHeader = () => {

    const dispatch = useAppDispatch()

    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)
    const userId = useAppSelector(state => state.auth.user._id)
    const paramsUserId = useAppSelector(state => state.packs.params.user_id)
    const newMin = useAppSelector(state => state.packs.params.min)
    const newMax = useAppSelector(state => state.packs.params.max)

    const minMaxHandler = (value: number[]) => {
        dispatch(changeParamsPacks({min: value[0], max: value[1]}))
    }

    const showPacksButtonHandler = (user_id: undefined | string) => {
        dispatch(changeParamsPacks({user_id}))
    }

    return (
        <div style={{display: 'flex', gap: '40px', marginBottom: '25px', alignItems: "center"}}>
            <ShowPacksButton paramsId={paramsUserId} callback={showPacksButtonHandler} userId={userId}/>
            <RangeTable
                newMin={newMin}
                newMax={newMax}
                min={min}
                max={max}
                width={250}
                minDistance={5}
                callback={minMaxHandler}
            />
            <InputTable page={'packs'}/>
            <ModalAddPack/>
        </div>
    );
};


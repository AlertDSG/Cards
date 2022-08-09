import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {authReducer} from "../features/auth/auth-reducer";
import {profileReducer} from "../features/profile/profile-reducer";
import {appReducer} from "./app-reducer";
import {packsReducer} from "../features/packs/packs-reducer";
import {cardsReducer} from "../features/cards/cards-reducer";
import {loadState, saveState} from "../common/utils/localStorage-utils";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export const store = createStore(rootReducer,loadState(), applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    saveState({
        cards: store.getState().cards,
        packs: store.getState().packs,
        app: store.getState().app,
        auth: store.getState().auth,
        profile: store.getState().profile,
    });
})


export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
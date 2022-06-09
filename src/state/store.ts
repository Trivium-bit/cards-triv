import {AuthorizationActionType, authReducer} from './auth-reducer'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {RegisterActionsType, registerReducer} from "./registerReduser";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {
    CardsPacksActionType,
    cardPacksReducer,
} from './cardPacksReducer';
import {CardActionType, cardsReducer} from "./cardsReducer";

const rootReducer = combineReducers({
    authReducer: authReducer,
    registerReducer: registerReducer,
    appReducer: appReducer,
    cardsPacksReducer: cardPacksReducer,
    cardsReducer: cardsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type RootActionsType = RegisterActionsType | AuthorizationActionType
    | CardsPacksActionType | CardActionType //сюда нужно добавлять свои типизации акшенов через или
export type AppThunkDispatch = ThunkDispatch<AppStoreType, null, RootActionsType>;
export type AppStoreType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;
export const useAppDispatch: () => AppThunkDispatch = useDispatch;

export default store

// @ts-ignore
window.store = store
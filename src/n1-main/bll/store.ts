import { authReducer, IsLoggedInActionsType, SetNewPasswordActionsType} from '../../n2-features/f1-auth/a1-login/auth-reducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {RegisterActionsType, registerReducer} from "./registerReduser";
import {profileReducer} from "../../n2-features/f1-auth/a2-profile/profile-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";

 const rootReducer = combineReducers({
     authReducer: authReducer,
     register: registerReducer,
     app: appReducer,
     profileReducer: profileReducer,
 })

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type RootActionsType = RegisterActionsType | IsLoggedInActionsType | SetNewPasswordActionsType; //сюда нужно добавлять свои типизации акшенов через или
export type AppThunkDispatch = ThunkDispatch<AppStoreType, null, RootActionsType>;
export type AppStoreType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;
export const useAppDispatch: () => AppThunkDispatch = useDispatch;

export default store

 // @ts-ignore
 window.store = store
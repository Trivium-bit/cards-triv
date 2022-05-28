import { authReducer} from './authReducer'
import {applyMiddleware, combineReducers, createStore} from 'redux';
import { loginReducer } from './loginReducer copy';
import thunkMiddleware from 'redux-thunk';
import {registerReducer} from "./registerReduser";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";

 const rootReducer = combineReducers({
     login: loginReducer,
     authReducer: authReducer,
     register: registerReducer,
     app: appReducer,
 })

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store

export type AppStoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;
 // @ts-ignore
window.store = store
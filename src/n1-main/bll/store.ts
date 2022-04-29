import { authReducer} from './authReducer'
import {combineReducers, createStore} from 'redux';
import { loginReducer } from './loginReducer copy';

 const reducers = combineReducers({
     login: loginReducer,
     authReducer: authReducer,
 })

 export const store = createStore(reducers)

 export default store

 export type AppStoreType = ReturnType<typeof reducers>

 // @ts-ignore
 window.store = store // for dev

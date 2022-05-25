import { authReducer} from './authReducer'
import {applyMiddleware, combineReducers, createStore} from 'redux';
import { loginReducer } from './loginReducer copy';
import thunkMiddleware from 'redux-thunk';

 const rootReducer = combineReducers({
     login: loginReducer,
     authReducer: authReducer,
 })

 export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

 export default store

 export type AppStoreType = ReturnType<typeof rootReducer>

 // @ts-ignore
 window.store = store
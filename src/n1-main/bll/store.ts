import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from '../../n2-features/f1-auth/a1-login/auth-reducer';
import {profileReducer} from "../../n2-features/f1-auth/a2-profile/profile-reducer";

 const rootReducer = combineReducers({
    authReducer: authReducer,
    profileReducer: profileReducer,
 })

 export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

 export default store

 export type AppStateType = ReturnType<typeof rootReducer>

 // @ts-ignore
 window.store = store
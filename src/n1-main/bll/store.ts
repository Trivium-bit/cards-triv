import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

 const rootReducer = combineReducers({
    // authReducer: authReducer,
 })

 export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

 export default store

 export type AppStoreType = ReturnType<typeof rootReducer>

 // @ts-ignore
 window.store = store
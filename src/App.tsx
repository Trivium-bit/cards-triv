import React, {useEffect} from "react";
import Routings from './n1-main/components/Routings';
import './App.css';
import {ErrorSnackBar} from "./n1-main/components/ErrorSnackBar/ErrorSnackBar";
import {useAppDispatch, useAppSelector} from "./n1-main/bll/store";
import {initializeAppTC} from "./n2-features/f1-auth/a1-login/auth-reducer";
import {CircularProgress} from "@mui/material";


function App() {
    const isInitialized = useAppSelector<boolean>(state => state.authReducer.isInitialized);
    const dispatch = useAppDispatch();


    useEffect(()=>{
        dispatch(initializeAppTC())
    },[dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
  return (
    <div className="App">
        <Routings />
        <ErrorSnackBar/>
    </div>
  );
}

export default App;



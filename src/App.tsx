import React, {useEffect} from "react";
import AppRoutes from './n1-main/components/AppRoutes';
import './App.css';
import {ErrorSnackBar} from "./n1-main/components/ErrorSnackBar/ErrorSnackBar";
import {useAppDispatch, useAppSelector} from "./n1-main/bll/store";
import {initializeAppTC} from "./n2-features/f1-auth/a1-login/auth-reducer";
import {CircularProgress} from "@mui/material";
import {isInitializedSelector} from "./Common/Selectors/Selectors";

function App() {
    const isInitialized = useAppSelector<boolean>(isInitializedSelector);
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
        <AppRoutes />
        <ErrorSnackBar/>
    </div>
  );
}

export default App;



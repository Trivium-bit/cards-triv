import React, {useEffect} from "react";
import AppRoutes, {PATH} from './n1-main/components/AppRoutes';
import './App.css';
import {ErrorSnackBar} from "./n1-main/components/ErrorSnackBar/ErrorSnackBar";
import {initializeAppTC} from "./n2-features/f1-auth/a1-login/auth-reducer";
import {useAppDispatch} from "./n1-main/bll/store";


function App() {

    const paramsString = document.location.hash;
    const dispatch = useAppDispatch();
    const condition = !(paramsString.includes( PATH.REGISTER) ||
        paramsString.includes( PATH.CHECK_EMAIL) ||
        paramsString.includes( PATH.PASS_RECOVERY)
    )
    useEffect(() => {
        if(condition)
        dispatch(initializeAppTC())
    }, [dispatch, condition])

  return (
    <div className="App">
        <AppRoutes />
        <ErrorSnackBar/>
    </div>
  );
}

export default App;



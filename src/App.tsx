import React, {useEffect} from "react";
import AppRoutes from './n1-main/components/AppRoutes';
import './App.css';
import {ErrorSnackBar} from "./n1-main/components/ErrorSnackBar/ErrorSnackBar";
import {initializeAppTC} from "./n2-features/f1-auth/a1-login/auth-reducer";
import {useAppDispatch} from "./n1-main/bll/store";



function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

  return (
    <div className="App">
        <AppRoutes />
        <ErrorSnackBar/>
    </div>
  );
}

export default App;



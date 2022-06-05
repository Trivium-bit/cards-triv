import React, {useEffect} from "react";
import AppRoutes from './n1-main/components/AppRoutes';
import './App.css';
import {ErrorSnackBar} from "./n1-main/components/ErrorSnackBar/ErrorSnackBar";
import {initializeAppTC} from "./n2-features/f1-auth/a1-login/auth-reducer";
import {useAppDispatch, useAppSelector} from "./n1-main/bll/store";
import {Loader} from "./Common/Components/Loader";
import {appStatusSelector, isInitializedSelector} from "./Common/Selectors/Selectors";
import {RequestStatusType} from "./n1-main/bll/app-reducer";


function App() {
    const isInitialized = useAppSelector<boolean>(isInitializedSelector);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <Loader/>
    }
    return (
        <div className="App">
            {appStatus === 'loading' && <Loader/>}
            <AppRoutes/>
            <ErrorSnackBar/>
        </div>
    );
}

export default App;



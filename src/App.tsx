import React, {useEffect} from "react";
import AppRoutes from './n1-main/components/AppRoutes';
import s from './App.module.scss';
import {ErrorSnackBar} from "./n1-main/components/pages/ErrorSnackBar/ErrorSnackBar";
import {initializeAppTC} from "./state/auth-reducer";
import {useAppDispatch, useAppSelector} from "./state/store";
import {Loader} from "./Common/Components/Loader";
import {appStatusSelector, isInitializedSelector} from "./Common/Selectors/Selectors";
import {RequestStatusType} from "./state/app-reducer";


function App() {
    const isInitialized = useAppSelector<boolean>(isInitializedSelector);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch])

    if (!isInitialized) {
        return <Loader/>
    }

    return (
        <main className={s.App}>
            {appStatus === 'loading' && <Loader/>}
            <AppRoutes/>
            <ErrorSnackBar/>
        </main>
    );
}

export default App;



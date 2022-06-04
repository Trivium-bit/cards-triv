import React, {useEffect} from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../bll/store";
import Header from "./Header";
import {isInitializedSelector, isLoggedInSelector} from "../../Common/Selectors/Selectors";

import {GlobalProgressAnimation} from "../../Common/Components/GlobalProgressAnimation";
import {initializeAppTC} from "../../n2-features/f1-auth/a1-login/auth-reducer";

const PrivateRoutes = () => {
    const location = useLocation();
    const isInitialized = useAppSelector<boolean>(isInitializedSelector);
    const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector);

    //запрос initializeAppTC() делаем тут так как эта компонента отвечает за раздачу роутингов
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <GlobalProgressAnimation/>
    }

    if (!isLoggedIn) {
        return (
            <Navigate
                to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
                replace
            />
        );
    }

    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default PrivateRoutes;
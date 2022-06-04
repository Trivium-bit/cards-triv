import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "../bll/store";
import Header from "./Header";
import {isInitializedSelector, isLoggedInSelector} from "../../Common/Selectors/Selectors";

import {GlobalProgressAnimation} from "../../Common/Components/GlobalProgressAnimation";

const PrivateRoutes = () => {
    const location = useLocation();
    const isInitialized = useAppSelector<boolean>(isInitializedSelector);
    const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector);

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
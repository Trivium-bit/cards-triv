import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "../bll/store";
import Header from "./Header";
import {isLoggedInSelector} from "../../Common/Selectors/Selectors";

const PrivateRoutes = () => {
    const location = useLocation();

    const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector);

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
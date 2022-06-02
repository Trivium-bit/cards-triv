import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "../bll/store";
import Header from "./Header";

const PrivateRoutes = () => {
    const location = useLocation();

    const isLoggedIn = useAppSelector<boolean>(state => state.authReducer.isLoggedIn);

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
            <Header />
            <Outlet />
        </div>
    );
};

export default PrivateRoutes;
import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStoreType} from "../bll/store";
import Header from "./Header";

const PrivateRoutes = () => {
    const location = useLocation();
    const user = useSelector<AppStoreType>((state) => state.app.user);

    if (!user) {
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
import React from 'react';
import {Navigate} from "react-router-dom";
import {PATH} from "../AppRoutes";



const Home = () => {

    return (

        <Navigate
            to={PATH.PACKS}
            replace
        />
    );
};

export default Home;
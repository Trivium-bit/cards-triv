import React from 'react';
import {Navigate} from "react-router-dom";
import {PATH} from "../Routings";

const Home = () => {
    return (
        <Navigate
            to={PATH.PACKS}
            replace
        />
    );
};

export default Home;
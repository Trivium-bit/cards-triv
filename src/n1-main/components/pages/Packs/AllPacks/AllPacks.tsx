import React from 'react';
import {Box} from "@mui/material";
import AllTable from "./AllTable";
import s from './AllPacks.module.scss'


const AllPacks = () => {

    return (
        <Box className={s.table}>
            <AllTable/>
        </Box>
    );
};

export default AllPacks;
import React from 'react';
import {Box} from "@mui/material";
import AllTable from "./AllTable";
import PacksHeader from "../PacksHeader";
import s from './AllPacks.module.scss'



const AllPacks = () => {

    return (
        <Box className={s.allPacksBlock}>
            <PacksHeader />
            <Box className={s.table}>
                <AllTable/>
            </Box>
        </Box>
    );
};

export default AllPacks;
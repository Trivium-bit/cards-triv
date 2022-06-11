import React from 'react';
import {Box} from "@mui/material";
import PackTable from "./PackTable";
import s from './AllPacks.module.scss'


const Packs = () => {

    return (
        <Box className={s.table}>
            <PackTable/>
        </Box>
    );
};

export default Packs;
import React from 'react';
import {Box, Input, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import s from './MyPacks.module.scss'
import MyTable from "./MyTable";

const MyPacks = () => {
    return (
        <Box className={s.myPacksBlock}>
            <h1 className={s.title}>My packs list</h1>
            <Input
                placeholder={"Search..."}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
            <Box className={s.table}>
                <MyTable/>
            </Box>
        </Box>
    );
};

export default MyPacks;
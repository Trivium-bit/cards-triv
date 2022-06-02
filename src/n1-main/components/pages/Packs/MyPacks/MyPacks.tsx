import React from 'react';
import {Box} from "@mui/material";
import MyTable from "./MyTable";
import Paginator from "../../../../../Common/Components/Paginator";
import PacksHeader from "../PacksHeader";
import s from './MyPacks.module.scss'

const MyPacks = () => {
    return (
        <Box className={s.myPacksBlock}>
            <PacksHeader />
            <Box className={s.table}>
                <MyTable/>
            </Box>
            <Box className={s.paginator}>
                <Paginator/>
            </Box>
        </Box>
    );
};

export default MyPacks;
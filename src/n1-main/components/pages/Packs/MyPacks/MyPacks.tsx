import React from 'react';
import {Box, Input, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import s from './MyPacks.module.scss'
import MyTable from "./MyTable";
import Paginator from "../../../../../Common/Components/Paginator";
import Button from "../../../../../Common/Components/Button";

const MyPacks = () => {
    return (
        <Box className={s.myPacksBlock}>
            <h1 className={s.title}>My packs list</h1>
            <Box className={s.elements}>
                <Input
                        placeholder={"Search..."}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                <Button
                    className={s.addBtn}
                    title={'Add New Pack'}/>
            </Box>
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
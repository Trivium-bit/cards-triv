import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import Grid from '@mui/material/Grid';
import {Box, Container} from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import { PATH } from './AppRoutes'
import {useAppDispatch} from "../bll/store";
import s from "../ui/Header.module.scss";
import {logOut} from "../../n2-features/f1-auth/a1-login/auth-reducer";


function Header() {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        dispatch(logOut())
    }

    return (
        <div className={s.header}>
            <Container>
                <Grid container >
                    <Grid item xs={4}>
                        <NavLink to={PATH.HOME}>
                            <span className={s.logo}>IT INCUBATOR</span>
                        </NavLink>
                    </Grid>
                    <Grid item xs={2}>
                        <Box className={`${s.headerLink} ${location.pathname === PATH.PACKS && s.headerLinkActive}`}>
                            <NavLink to={PATH.PACKS} >
                                <div className={s.packList}>
                                    <ArticleIcon className={s.icon}  fontSize="medium"/>
                                    <span className={s.title}>Packs List</span>
                                </div>
                            </NavLink>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box className={`${s.headerLink} ${location.pathname === PATH.PROFILE && s.headerLinkActive}`}>
                            <NavLink to={PATH.PROFILE} >
                                <div className={s.packList}>
                                    <PersonIcon className={s.icon} fontSize="medium"/>
                                    <span className={s.title}>Profile</span>
                                </div>
                            </NavLink>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <span className={s.logOut} onClick={handleLogOut}>Log Out</span>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Header;

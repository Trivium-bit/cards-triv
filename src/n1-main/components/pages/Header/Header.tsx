import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import Grid from '@mui/material/Grid';
import {Box, Container} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { PATH } from '../../AppRoutes'
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import s from "./Header.module.scss";
import {logOutTC} from "../../../../state/auth-reducer";
import {RequestStatusType} from "../../../../state/app-reducer";
import {appStatusSelector} from "../../../../Common/Selectors/Selectors";
import {setIsMyTableAC} from "../../../../state/cardPacksReducer";
import icon from "./../../../../images/CardPacks.svg"

function Header() {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const handleLogOut = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        dispatch(logOutTC())
    }
    const handleChangeIsMyTable = () =>{
        dispatch(setIsMyTableAC(true));
    }
    return (
        <div className={s.header}>
            <Container>
                <Grid container >
                    <Grid item xs={0} sm={2} md={4}>
                        <NavLink to={PATH.HOME}>
                            <span className={s.logo}>IT INCUBATOR</span>
                        </NavLink>
                    </Grid>
                    <Grid item xs={5} sm={4} md={2}>
                        <Box className={`${s.headerLink} ${location.pathname === PATH.PACKS && s.headerLinkActive}`}>
                            <NavLink to={PATH.PACKS} >
                                <div className={s.packList}>
                                    <img src={icon} alt="cardPackIcon" className={s.icon}/>
                                    <span className={s.title}>Packs List</span>
                                </div>
                            </NavLink>
                        </Box>
                    </Grid>
                    <Grid item xs={5} sm={4} md={2}>
                        <Box className={`${s.headerLink} ${location.pathname === PATH.PROFILE && s.headerLinkActive}`}>
                            <NavLink to={PATH.PROFILE} >
                                <div className={s.packList} onClick={handleChangeIsMyTable}>
                                    <PersonIcon className={s.icon} fontSize="medium"/>
                                    <span className={s.title}>Profile</span>
                                </div>
                            </NavLink>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={2} md={4}>
                        <Box>
                            <span className={s.logOut}
                                  onClick={handleLogOut}
                                  aria-disabled={appStatus === "loading"}>
                                Log Out
                            </span>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Header;

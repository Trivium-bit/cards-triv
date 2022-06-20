import React from 'react';
import {Box, Container, Grid} from "@mui/material";
import s from './styles/Packs.module.scss'
import Slider from "../../Slider/Slider";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import PacksHeader from "./PacksHeader";
import {RequestStatusType} from "../../../../state/app-reducer";
import {appStatusSelector, isMyTableSelector} from "../../../../Common/Selectors/Selectors";
import {setIsMyTableAC} from "../../../../state/cardPacksReducer";
import {PackTable} from "./AllPacks/PackTable";




const PacksContainer = () => {
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const dispatch = useAppDispatch();
    const isMyTable = useAppSelector<boolean>(isMyTableSelector);

    const handlerOpenAllTable = () => {

        dispatch(setIsMyTableAC(false))
        /*dispatch(setLocalCardPackNameAC(""));*/
    }
    const handlerOpenMyTable = () => {

        dispatch(setIsMyTableAC(true))
        /*dispatch(setLocalCardPackNameAC(""));*/
    }

    return (
        <Container className={s.mainContainer} fixed>
            <Box className={s.packsContainer}>
                <Grid container>
                    <Grid xs={12} md={3} lg={3} item>
                        <Grid container direction="column" className={s.packColumn}>
                            <Box className={s.showPacks}>
                                <span className={s.title}>Show packs cards</span>
                                <Box className={s.btnGroup}>
                                    <button className={isMyTable ? s.buttonActive : s.btn}
                                            disabled={appStatus === "loading"}
                                            onClick={handlerOpenMyTable}
                                    >My
                                    </button>
                                    <button className={!isMyTable ? s.buttonActive : s.btn}
                                            disabled={appStatus === "loading"}
                                            onClick={handlerOpenAllTable}
                                    >All
                                    </button>
                                </Box>
                                <Box className={s.utils}>
                                    <p className={s.title}>Number of cards</p>
                                    <Slider/>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={9} lg={9} item>
                        <Box className={s.myPacksBlock}>
                            <PacksHeader/>
                            <PackTable/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default PacksContainer;
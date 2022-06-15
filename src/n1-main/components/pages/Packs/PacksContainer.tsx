import React from 'react';
import {Box, Container, Grid} from "@mui/material";
import s from './styles/Packs.module.scss'
import Slider from "../../Slider/Slider";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import PacksHeader from "./PacksHeader";
import {RequestStatusType} from "../../../../state/app-reducer";
import {appStatusSelector} from "../../../../Common/Selectors/Selectors";
import {useSearchParams} from "react-router-dom";
import {setIsMyTableAC, setLocalCardPackNameAC} from "../../../../state/cardPacksReducer";
import {PackTable} from "./AllPacks/PackTable";




const PacksContainer = () => {
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const dispatch = useAppDispatch()
    const isMyTable = useAppSelector<boolean>(state => state.cardPacksReducer.isMyTable);

    const [, setSearchParams] = useSearchParams()

    const handlerOpenAllTable = () => {
        setSearchParams({ page: "1" })
        dispatch(setIsMyTableAC(false))
        dispatch(setLocalCardPackNameAC(""));
    }
    const handlerOpenMyTable = () => {
        setSearchParams({ page: "1" })
        dispatch(setIsMyTableAC(true))
        dispatch(setLocalCardPackNameAC(""));
    }



    return (


        <Container fixed>
            <Box className={s.packsContainer}>
                <Grid container>
                    <Grid xs={3} item>
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
                    <Grid xs={9} item>
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
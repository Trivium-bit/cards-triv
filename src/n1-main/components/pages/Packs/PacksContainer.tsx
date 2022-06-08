import React, {useEffect} from 'react';
import {Box, Container, Grid} from "@mui/material";
import s from './styles/Packs.module.scss'
import Packs from "./AllPacks/Packs";
import Slider from "../../Slider/Slider";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import PacksHeader from "./PacksHeader";
import {RequestStatusType} from "../../../../state/app-reducer";
import {appStatusSelector} from "../../../../Common/Selectors/Selectors";
import {findPackTC, setIsMyTableAC, setLocalCardPackNameAC} from "../../../../state/cardPacksReducer";
import useDebounce from "../../../../utils/useDebounce";


const PacksContainer = () => {
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const dispatch = useAppDispatch()
    const isMyTable = useAppSelector<boolean>(state => state.cardsReducer.isMyTable);
    const localPackName = useAppSelector<string>(state => state.cardsReducer.localPackName);
    // Состояние и сеттер состояния для поискового запроса

    const handlerOpenAllTable = () => {
        dispatch(setIsMyTableAC(false))
        dispatch(setLocalCardPackNameAC(""))
    }
    const handlerOpenMyTable = () => {
        dispatch(setIsMyTableAC(true))
        dispatch(setLocalCardPackNameAC(""))
    }
    const debouncedSearchTerm = useDebounce(localPackName, 1000);

    useEffect(
        () => {
            typeof debouncedSearchTerm === 'string' && dispatch(findPackTC(debouncedSearchTerm))
        }, [debouncedSearchTerm, dispatch]
    );
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
                                <Box>
                                    <p className={s.title}>Number of cards</p>
                                    <Slider/>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid xs={9} item>
                        <Box className={s.myPacksBlock}>
                            <PacksHeader/>
                            <Packs/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default PacksContainer;
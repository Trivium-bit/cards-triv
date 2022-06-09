import React, {useEffect} from 'react';
import {Box, Container, Grid} from "@mui/material";
import s from './styles/Packs.module.scss'
import Packs from "./AllPacks/Packs";
import Slider from "../../Slider/Slider";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import PacksHeader from "./PacksHeader";
import {RequestStatusType} from "../../../../state/app-reducer";
import {appStatusSelector} from "../../../../Common/Selectors/Selectors";
import {
    getCardsPacksTC,
    setIsMyTableAC,
    setLocalCardPackNameAC,

} from "../../../../state/cardPacksReducer";

import {useSearchParams} from "react-router-dom";
import {useDebounce} from "../../../../utils/useDebounce";


const PacksContainer = () => {
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const min = useAppSelector<number>(state => state.cardsPacksReducer.min);
    const max = useAppSelector<number>(state => state.cardsPacksReducer.max);
    const dispatch = useAppDispatch()
    const isMyTable = useAppSelector<boolean>(state => state.cardsPacksReducer.isMyTable);
    const localPackName = useAppSelector<string>(state => state.cardsPacksReducer.localPackName);
    const debounceDelay = 1000;
    // Состояние и сеттер состояния для поискового запроса
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number( searchParams.get("page")) || 1;
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

    const debouncePackName = useDebounce(debounceDelay,localPackName ).toString();//это значние со строки поиска имени пэка задержки дебаунса
    const [minQuery, maxQuery] = useDebounce(debounceDelay,min, max ); //это значения со слайдера после задержки дебаунса

    useEffect(() => {
        dispatch(getCardsPacksTC(isMyTable, currentPage, debouncePackName,minQuery, maxQuery ))
        }, [currentPage, dispatch, isMyTable, debouncePackName, minQuery, maxQuery]);


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
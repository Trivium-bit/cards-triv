import React, {useState} from 'react';
import {Box, Container, Grid} from "@mui/material";
import MyPacks from "./MyPacks/MyPacks";
import s from './styles/Packs.module.scss'
import AllPacks from "./AllPacks/AllPacks";
import Slider from "../../Slider/Slider";
import {useAppSelector} from "../../../../state/store";
import PacksHeader from "./PacksHeader";
import {RequestStatusType} from "../../../../state/app-reducer";
import {appStatusSelector} from "../../../../Common/Selectors/Selectors";


const Packs = () => {
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);
    const [show, setShow] = useState<string>("MyPacks")

    return (
        <Container fixed>
            <Box className={s.packsContainer}>
                <Grid container>
                    <Grid xs={3} item>
                        <Grid container direction="column" className={s.packColumn}>
                            <Box className={s.showPacks}>
                                <span className={s.title}>Show packs cards</span>
                                <Box className={s.btnGroup}>
                                    <button className={show === "MyPacks" ? s.buttonActive : s.btn}
                                            disabled={appStatus === "loading"}
                                            onClick={() => setShow("MyPacks")}
                                    >My
                                    </button>
                                    <button className={show === "AllPacks" ? s.buttonActive : s.btn}
                                            disabled={appStatus === "loading"}
                                            onClick={() => setShow("AllPacks")}
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
                            {show === "MyPacks" && <MyPacks/>}
                            {show === "AllPacks" && <AllPacks/>}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Packs;
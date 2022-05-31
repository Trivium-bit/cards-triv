import React from 'react';
import {Box, Container, Grid} from "@mui/material";
import MyPacks from "./MyPacks/MyPacks";
import s from './Packs.module.scss'

const Packs = () => {
    return (
        <Container fixed >
            <Box className={s.packsContainer}>
                <Grid container>
                    <Grid xs={3} item>
                        <Grid container direction="column" className={s.packColumn}>
                            <Box className={s.showPacks}>
                                <span className={s.title}>Show packs cards</span>
                                <Box className={s.btnGroup}>
                                    <button className={`${s.btn} ${s.buttonActive}`}>My</button>
                                    <button className={s.btn}>All</button>
                                </Box>
                                <Box>
                                  <span className={s.title}>Number of cards</span>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid xs={9} item>
                        <MyPacks/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Packs;
import React, {useState} from 'react';
import {Box, Container, Grid} from "@mui/material";
import MyPacks from "./MyPacks/MyPacks";
import s from './Packs.module.scss'

const Packs = () => {
    const [show, setShow] = useState("MyPacks")

    return (
        <Container fixed >
            <Box className={s.packsContainer}>
                <Grid container>
                    <Grid xs={3} item>
                        <Grid container direction="column" className={s.packColumn}>
                            <Box className={s.showPacks}>
                                <span className={s.title}>Show packs cards</span>
                                <Box className={s.btnGroup}>
                                    <button className={show === "MyPacks" ? s.buttonActive : s.btn}
                                            onClick={() => setShow("MyPacks")}
                                    >My</button>
                                    <button className={show === "AllPacks" ? s.buttonActive : s.btn}
                                            onClick={() => setShow("AllPacks")}
                                    >All</button>
                                </Box>
                                <Box>
                                    <span className={s.title}>Number of cards</span>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    {show === "MyPacks" && (
                        <Grid xs={9} item>
                            <MyPacks/>
                        </Grid>
                    )
                    }
                    {show === "AllPacks" && (
                        <Grid xs={9} item>
                            all packs
                        </Grid>
                    )
                    }

                </Grid>
            </Box>
        </Container>
    );
};

export default Packs;
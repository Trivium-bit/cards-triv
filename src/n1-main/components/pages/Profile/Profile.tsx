import React from "react";
import {Box, Container, Grid} from "@mui/material";
import UserProfile from "./UserProfile";
import MyPacks from "../Packs/MyPacks/MyPacks";
import s from './Profile.module.scss'

const Profile = () => {
    return (
        <div className={s.profileBlock}>
            <Container fixed >
                <Box className={s.profileContainer}>
                    <Grid container>
                        <Grid xs={3} item>
                            <Grid container direction="column" className={s.profileColumn}>
                                <Box className={s.profile}>
                                   <UserProfile/>
                                </Box>
                                <Box className={s.utils}>
                                    utils
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid xs={9} item>
                            <MyPacks/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </div>
    );
};

export default Profile;

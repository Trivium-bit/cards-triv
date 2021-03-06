import React from "react";
import {Box, Container, Grid} from "@mui/material";
import UserProfile from "./UserProfile";
import s from './Profile.module.scss'
import Slider from "../../Slider/Slider";
import PacksHeader from "../Packs/PacksHeader";
import {useAppSelector} from "../../../../state/store";
import {userNameSelector} from "../../../../Common/Selectors/Selectors";
import {PackTable} from "../Packs/AllPacks/PackTable";



const Profile = () => {
    const userName = useAppSelector<string>(userNameSelector);

    return (
            <Container fixed >
                <Box className={s.profileContainer}>
                    <Grid container >
                        <Grid xs={12} md={3} lg={3} item className={s.profileColumn}>
                            <Grid container direction="column" >
                                <Box className={s.profile}>
                                    <UserProfile />
                                </Box>
                                <Box className={s.utils}>
                                    <p className={s.utilsTitle}>Number of Cards</p>
                                    <Slider/>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={9} lg={9} item >
                            <Box className={s.myPacksBlock}>
                                <PacksHeader packsOwnerName={userName}/>
                                <PackTable/>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

            </Container>

    );
};

export default Profile;
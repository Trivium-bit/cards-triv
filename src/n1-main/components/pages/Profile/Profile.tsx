import React from "react";
import {Box, Container, Grid} from "@mui/material";
import UserProfile from "./UserProfile";
import s from './Profile.module.scss'
import Slider from "../../Slider/Slider";
import PacksHeader from "../Packs/PacksHeader";
import {useAppSelector} from "../../../../state/store";
import {userNameSelector} from "../../../../Common/Selectors/Selectors";
import Packs from "../Packs/AllPacks/Packs";



const Profile = () => {
    const userName = useAppSelector<string>(userNameSelector);
    return (
        <div className={s.profileBlock}>
            <Container fixed >
                <Box className={s.profileContainer}>
                    <Grid container>
                        <Grid xs={3} item>
                            <Grid container direction="column" className={s.profileColumn}>
                                <Box className={s.profile}>
                                    <UserProfile />
                                </Box>
                                <Box className={s.utils}>
                                    <p className={s.utilsTitle}>Number of Cards</p>
                                    <Slider/>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid xs={9} item>
                            <Box className={s.myPacksBlock}>
                                <PacksHeader packsOwnerName={userName}/>
                                <Packs/>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default Profile;
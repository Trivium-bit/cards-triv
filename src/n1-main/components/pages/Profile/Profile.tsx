import React, {useMemo} from "react";
import {Box, Container, Grid} from "@mui/material";
import UserProfile from "./UserProfile";
import s from './Profile.module.scss'
import Slider from "../../Slider/Slider";
import PacksHeader from "../Packs/PacksHeader";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import MyPacks from "../Packs/MyPacks/MyPacks";
import {useLocation} from "react-router-dom";
import {getMyCardsPacksTC} from "../../../../state/cardPacksReducer";




const Profile = () => {
    const { name, _id } = useAppSelector(state => state.appReducer.user);
    const dispatch = useAppDispatch()
    const location = useLocation();
    const currentPage = useMemo(() => {
        return new URLSearchParams(location.search)?.get("page") || "1";
    }, [location.search]);

    const handleOnAddNewPack = () => {
        dispatch(getMyCardsPacksTC(_id, currentPage))
    }

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
                                <PacksHeader onAddNew={handleOnAddNewPack} packsOwnerName={name}/>
                                <MyPacks/>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default Profile;

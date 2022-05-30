import {  useSelector } from "react-redux";
import {AppStoreType} from "../../../bll/store";
import {ResponseLoginType} from "../../../dall/login-api";
import s from './Profile.module.scss'
import {Box, Button, Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";

const Profile = () => {
    const user = useSelector<AppStoreType, ResponseLoginType | undefined>((state) => state.app.user);

    return (
        <div className={s.profileBlock}>
            <Container fixed >
                <Box className={s.profileContainer}>
                    <Grid container>
                        <Grid xs={3} item>
                            <Grid container direction="column" className={s.profileColumn}>
                                <Box className={s.profile}>
                                    {user ? (
                                        <div>
                                            <div className={s.profileImg}>
                                                <img className={s.img} src={user.avatar ||  "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="avatar"/>
                                            </div>
                                            <div className={s.infoGroup}>
                                                <div>{user.name}</div>
                                                <div>Front-end Dev</div>
                                                <Link to="/profile/edit">
                                                    <Button variant="outlined">Edit Profile</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (<div>
                                        ... loading
                                    </div>)}
                                </Box>
                                <Box className={s.utils}>
                                    fff
                                </Box>
                            </Grid>

                        </Grid>
                        <Grid xs={9} item>
                            fff
                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </div>
    );
};

export default Profile;

import React from 'react';
import s from "./UserProfile.module.scss";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store";
import {ResponseLoginType} from "../../../dall/login-api";

const UserProfile = () => {
    const user = useSelector<AppStoreType, ResponseLoginType | undefined>((state) => state.app.user);

    return (
        <>
            {user ? (
                <div>
                    <div className={s.profileImg}>
                        <img className={s.img} src={user.avatar ||  "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="avatar"/>
                    </div>
                    <div className={s.infoGroup}>
                        <div className={s.name}>{user.name}</div>
                        <div className={s.desc}>Front-end Dev</div>
                        <Link to="/profile/edit">
                            <Button className={s.btn} variant="outlined">Edit Profile</Button>
                        </Link>
                    </div>
                </div>
            ) : (<div>
                ... loading
            </div>)}
        </>
    );
};

export default UserProfile;
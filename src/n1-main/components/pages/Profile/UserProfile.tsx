import React from 'react';
import s from "./UserProfile.module.scss";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store";
import {ResponseLoginType} from "../../../dall/login-api";
import EditProfileModal from "../EditProfile/EditProfileModal";


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
                        <EditProfileModal
                            title={'Personal Information'}
                            email={user.email}
                            name={user.name}
                            avatar={user.avatar ||  "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}/>
                    </div>
                </div>
            ) : (<div>
                ... loading
            </div>)}
        </>
    );
};

export default UserProfile;
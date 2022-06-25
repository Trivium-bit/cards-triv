import React from 'react';
import s from "./UserProfile.module.scss";
import {useAppSelector} from "../../../../state/store";
import EditProfileModal from "../EditProfile/EditProfileModal";
import {appUserSelector} from "../../../../Common/Selectors/Selectors";
import anonymousUserPhoto from "./../../../../images/anonymousUserPhoto.jpg";
import {Loader} from "../../../../Common/Components/Loader";
import {ResponseLoginType} from "../../../../api/loginAPI";

const UserProfile = ( ) => {
    const user = useAppSelector<ResponseLoginType>(appUserSelector);

    return (
        <>
            {user ? (
                <div>
                    <div className={s.profileImg}>
                        <img className={s.img} src={user.avatar || anonymousUserPhoto} alt="avatar"/>
                    </div>
                    <div className={s.infoGroup}>
                        <div className={s.name}>{user.name}</div>
                        <div className={s.desc}>Front-end Dev</div>
                        <EditProfileModal
                            title={'Personal Information'}
                        />
                    </div>
                </div>
            ) : (<div>
                <Loader/>
            </div>)}
        </>
    );
};

export default UserProfile;
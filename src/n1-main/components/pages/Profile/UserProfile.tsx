import React, {useState} from 'react';
import s from "./UserProfile.module.scss";
import {useAppSelector} from "../../../../state/store";
import EditProfileModal from "../EditProfile/EditProfileModal";
import {appUserSelector} from "../../../../Common/Selectors/Selectors";
import anonymousUserPhoto from "./../../../../images/anonymousUserPhoto.jpg";
import {UserType} from "../../../../state/app-reducer";

const UserProfile = ( ) => {
    const user = useAppSelector<UserType>(appUserSelector);
    const [localName, setLocalName] = useState<string |undefined>(user?.name);
    const changeName = (userName: string |undefined) =>{
        setLocalName(userName);
    }

    console.log("user?.avatar", user?.avatar)

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
                            changeName={changeName}
                            title={'Personal Information'}
                            email={user.email}
                            serverAvatar={user.avatar || anonymousUserPhoto}
                            name={localName}
                        />
                    </div>
                </div>
            ) : (<div>
                ... loading
            </div>)}
        </>
    );
};

export default UserProfile;
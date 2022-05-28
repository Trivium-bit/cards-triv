import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {AppStateType} from "../../bll/store";
import {ThunkDispatch} from "redux-thunk";
import {
    ActionType,
    getProfileTC,
    InitialProfileStateType
} from "../../../n2-features/f1-auth/a2-profile/profile-reducer";
import {PATH} from "../Routings";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<AppStateType, string, ActionType> = useDispatch()
    const { profile,  error } = useSelector<AppStateType, InitialProfileStateType>(state => state.profileReducer)

    useEffect(()=>{
       if (!profile) {
           dispatch(getProfileTC())
       }
    },[profile]);

    useEffect(() => {
        if (error && error.code === 401) {
            navigate(PATH.LOGIN)
        }
    }, [error])

    return (
        <div>
            {profile ? (
                <div>
                    {profile.name}
                </div>
            ) : (
                <div>
                    ...loading
                </div>
            )}
        </div>
    );
};

export default Profile;

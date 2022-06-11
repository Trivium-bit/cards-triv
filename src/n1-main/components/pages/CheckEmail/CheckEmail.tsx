import React, {FC} from 'react';
import styles from "./CheckEmail.module.scss";
import commonStyles from "./../../../../Common/Styles/commonStyles.module.scss";
import checkEmailImage from "./../../../../images/checkEmail.svg"
import {useAppSelector} from "../../../../state/store";
import {appStatusSelector} from "../../../../Common/Selectors/Selectors";
import {RequestStatusType} from "../../../../state/app-reducer";
import {Loader} from "../../../../Common/Components/Loader";

export let emailFromLocalStorage = localStorage.getItem("email")
if (emailFromLocalStorage) {
    emailFromLocalStorage = emailFromLocalStorage.replace(/['"]+/g, '') //убираем кавычки из строки из localStorage
}

export const CheckEmail: FC = () => {
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);


    if (appStatus === "loading") {
        return <Loader/>
    }

    return (
        <div className={styles.checkEmailWrapper}>
            <h2 className={commonStyles.h2}>It-incubator</h2>
            <img src={checkEmailImage} alt={"checkEmailImage"}/>
            <h2 className={commonStyles.h2}>Check Email</h2>
            <p>We’ve sent an Email with instructions to {emailFromLocalStorage} </p>
        </div>
    );
};


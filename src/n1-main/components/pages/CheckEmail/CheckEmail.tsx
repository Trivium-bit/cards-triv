import React, {FC} from 'react';
import styles from "./CheckEmail.module.scss";
import commonStyles from "./../../../../Common/Styles/commonStyles.module.scss";
import checkEmailImage from "./../../../../images/checkEmail.svg"
import {useAppSelector} from "../../../bll/store";
import {appStatusSelector, emailSelector} from "../../../../Common/Selectors/Selectors";
import {RequestStatusType} from "../../../bll/app-reducer";
import {GlobalProgressAnimation} from "../../../../Common/Components/GlobalProgressAnimation";


export const CheckEmail: FC = () => {
    const email = useAppSelector<string>(emailSelector);
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);



    if (appStatus === "loading") {
        return <GlobalProgressAnimation/>
    }

    return (
        <div className={styles.checkEmailWrapper}>
            <h2 className={commonStyles.h2}>It-incubator</h2>
            <img src={checkEmailImage} alt={"checkEmailImage"}/>
            <h2 className={commonStyles.h2}>Check Email</h2>
            <p>We’ve sent an Email with instructions to {email} </p>
        </div>
    );
};


import React, {FC} from 'react';
import styles from "./CheckEmail.module.scss";
import commonStyles from "./../../../../Common/Styles/commonStyles.module.scss";
import checkEmailImage from "./../../../../images/checkEmail.svg"
import {useAppSelector} from "../../../bll/store";
import {emailSelector} from "../../../../Common/Selectors/Selectors";

export const CheckEmail:FC = () => {
    const email = useAppSelector<string>(emailSelector);
    return (
        <div className={styles.checkEmailWrapper}>
            <h2 className={commonStyles.h2}>It-incubator</h2>
            <img src={checkEmailImage} alt={"checkEmailImage"}/>
            <h2 className={commonStyles.h2}>Check Email</h2>
            <p className={styles.p}>We’ve sent an Email with instructions to {email}</p>
        </div>
    );
};


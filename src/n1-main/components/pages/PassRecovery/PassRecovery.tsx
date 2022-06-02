import styles from "./PasswordRecovery.module.scss";
import React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Button from "../../../../Common/Components/Button";
import {useFormik} from "formik";
import {useAppDispatch} from "../../../bll/store";
import {forgotTC} from "../../../bll/registerReduser";
import {PATH} from "../../Routings";

type FormikErrorType = {
    email: string
}
export type RecoveryEmailType = {
    email: string
}
export const PassRecovery =()=> {
    const navigate = useNavigate();
    const onClickHandler = () =>{
        navigate(PATH.LOGIN);
    }
    const dispatch = useAppDispatch();
    const formik = useFormik({
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (!values.email) {
                errors.email = 'Email Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },
        initialValues: {
            email: "",
        },

        onSubmit: (email: RecoveryEmailType) => {
            dispatch(forgotTC(email))
            navigate(PATH.CHECK_EMAIL)
        }
    })

    return (
        <div className={styles.passRecoveryWrapper}>
            <h2 className={styles.h2}>It-incubator</h2>
            <h2 style={{marginTop:0, marginBottom: 17}}>Forgot your password?</h2>
            <TextField sx={{m: 1, width: '35ch'}} id="standard-basic" label="Email" variant="standard"
                       {...formik.getFieldProps("email")}/>
            {formik.touched.email && formik.errors.email ?
                <div className={styles.error}>{formik.errors.email}</div> : null}
            <p className={styles.p}>
                Enter your email address and we will send you further instructions
            </p>
            <form onSubmit={formik.handleSubmit}>
                <Button className={styles.button} title={"Send Instructions"}/>
            </form>
            <p className={styles.pSmall}>
                Did you remember your password?
            </p>
            <p onClick={onClickHandler} className={styles.pLogin}> Try logging in</p>
        </div>
    );
}




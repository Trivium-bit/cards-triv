import styles from "./PasswordRecovery.module.scss";
import React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Button from "../../../../Common/Components/Button";


export const PassRecovery =()=> {
    const navigate = useNavigate();
    const onClickHandler = () =>{
        navigate("/login");
    }
    return (
        <div className={styles.passRecoveryWrapper}>
            <h2 className={styles.h2}>It-incubator</h2>
            <h2 style={{marginTop:0, marginBottom: 17}}>Forgot your password?</h2>
            <TextField sx={{m: 1, width: '35ch'}} id="standard-basic" label="Email" variant="standard" />
            <p className={styles.p}>
                Enter your email address and we will send you further instructions
            </p>
            <Button className={styles.button} title={"Send Instructions"}/>
            <p className={styles.pSmall}>
                Did you remember your password?
            </p>
            <p onClick={onClickHandler} className={styles.pLogin}> Try logging in</p>
        </div>
    );
}




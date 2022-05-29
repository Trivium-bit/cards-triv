import styles from "./PasswordRecovery.module.scss"
import React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function PassRecovery() {
    const navigate = useNavigate();
    const onClickHandler = () =>{
        navigate("/login")
    }
    return (
        <div className={styles.passRecoveryWrapper}>
            <h2 className={styles.h2}>It-incubator</h2>
            <h2>Forgot your password?</h2>
            <TextField sx={{m: 1, width: '35ch'}} id="standard-basic" label="Email" variant="standard" />
            <p className={styles.p}>
                Enter your email address and we will send you further instructions
            </p>
            <button>Send Instructions</button>
            <p className={styles.pSmall}>
                Did you remember your password?
            </p>
            <p onClick={onClickHandler} className={styles.pLogin}> Try logging in</p>
        </div>
    );
}

export default PassRecovery;



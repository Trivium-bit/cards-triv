import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Loader.module.scss"

export const Loader = () => {
    return (
        <div className={styles.main}>
            <div className={styles.progress}>
                <CircularProgress size={50}/>
            </div>
        </div>
    );
};


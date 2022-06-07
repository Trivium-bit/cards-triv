import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import {NullableType, setAppErrorAC} from "../../../../state/app-reducer";
import Alert from "@mui/material/Alert";
import {AlertTitle} from "@mui/material";
import {appStatusErrorSelector} from "../../../../Common/Selectors/Selectors";


export const ErrorSnackBar = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector<NullableType<string>>(appStatusErrorSelector);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert
                onClose={handleClose} severity="error" sx={{width: '100%'}}>
                <AlertTitle>Error</AlertTitle>
                <strong>{error}</strong>
            </Alert>
        </Snackbar>
    );
};

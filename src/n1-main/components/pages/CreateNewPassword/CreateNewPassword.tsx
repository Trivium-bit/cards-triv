import styles from "./CreateNewPassword.module.scss";
import { useFormik } from "formik";
import { NullableType, RequestStatusType, setAppErrorAC } from "../../../bll/app-reducer";
import { CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { sendNewPasswordTC } from "../../../../n2-features/f1-auth/a1-login/auth-reducer";
import { NewPasswordType } from "../../../dall/login-api";
import { Navigate } from "react-router-dom";

type FormikErrorType = {
    password: string
}

function CreateNewPassword() {

    const [isPassType, setIsPassType] = useState<boolean>(true);
    const error = useAppSelector<NullableType<string>>(state => state.appReducer.error);
    const appStatus = useAppSelector<RequestStatusType>(state => state.appReducer.status);
    const info = useAppSelector<string>(state => state.authReducer.info);

    const dispatch = useAppDispatch();

    //const {token} = useParams();

    const formik = useFormik({
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (values.password.length < 8) {
                errors.password = "Invalid password length"
            }
            if (!values.password) {
                errors.password = "Password required"
            }
            return errors;
        },
        initialValues: {
            password: "",
            resetPasswordToken: ""
        },

        onSubmit: (newPassword: NewPasswordType) => {
            dispatch(sendNewPasswordTC(newPassword))

        }
    });
    const handleClickShowPassword = () => {
        setIsPassType(!isPassType);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        info && <Navigate replace to="/login" />
    }, [info])

    useEffect(() => {
        return () => {
            dispatch(setAppErrorAC(null));
        }
    }, [dispatch])

    return (
        <div className={styles.loginWrapper}>
            <h1 className={styles.h1}>
                It-incubator
            </h1>
            <h2 className={styles.h2}>
                Create new password
            </h2>
            <div className={styles.textFields}>
                <FormControl sx={{ m: 1, width: '32ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input {...formik.getFieldProps("password")}
                        id="standard-adornment-password"
                        type={isPassType ? 'password' : 'text'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {isPassType ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {formik.touched.password && formik.errors.password ?
                        <div className={styles.errors}>{formik.errors.password}</div> : null}
                </FormControl>
                <div className={styles.errors}>{error}</div>

                <div className={styles.textInstruction}>Create new password and we will send you further instruction to email</div>
                <div className={styles.button}>
                    <form onSubmit={formik.handleSubmit} className={styles.submit}>
                        {appStatus === "succeeded"
                            ? <button type="submit" className={styles.sendButton}>Create new password</button>
                            : <div className={styles.circularProgress}>
                                <CircularProgress />
                            </div>
                        }
                    </form>

                </div>
            </div>
        </div>
    );
}

export default CreateNewPassword;

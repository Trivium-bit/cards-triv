import styles from "./CreateNewPassword.module.scss";
import { useFormik } from "formik";
import { NullableType, RequestStatusType, setAppErrorAC } from "../../../bll/app-reducer";
import { CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { setNewPasswordAC, sendNewPasswordTC } from "../../../../n2-features/f1-auth/a1-login/auth-reducer";
import { NewPasswordType } from "../../../dall/login-api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../Common/Components/Button";
import {PATH} from "../../AppRoutes";

type FormikErrorType = {
    password: string
}

function CreateNewPassword() {

    const [isPassType, setIsPassType] = useState<boolean>(true);
    const error = useAppSelector<NullableType<string>>(state => state.appReducer.error);
    const appStatus = useAppSelector<RequestStatusType>(state => state.appReducer.status);
    const info = useAppSelector<string>(state => state.authReducer.info);
    let navigate = useNavigate();

    const params = useParams<"token">();
    let token = params.token;

    const dispatch = useAppDispatch();

    const formik = useFormik({
        validate: (values: NewPasswordType) => {
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
            resetPasswordToken: token as string
        },
        onSubmit: ({ password, resetPasswordToken }: NewPasswordType) => {
            dispatch(sendNewPasswordTC({ password, resetPasswordToken }))
            dispatch(setNewPasswordAC(info))
        }
    });
    const handleClickShowPassword = () => {
        setIsPassType(!isPassType);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        dispatch(setAppErrorAC(null));
    }, [dispatch]);

    useEffect(() => {

        if (info) {
            return navigate(PATH.LOGIN);
        }
    }, [info]);

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


                        {appStatus === "loading"
                        ? <div className={styles.circularProgress}>
                            <CircularProgress />
                        </div>
                        : <Button title={"Create new password"} type="submit" className={styles.sendButton}/>
                           
                        }
                    </form>

                </div>
            </div>
        </div>
    );
}

export default CreateNewPassword;

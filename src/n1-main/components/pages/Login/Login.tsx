import {NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PATH } from "../../Routings";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import {AppStoreType, useAppDispatch, useAppSelector} from "../../../bll/store";
import { loginTC} from "../../../../n2-features/f1-auth/a1-login/auth-reducer";
import { useSelector } from "react-redux";
import { LoginParamsType, ResponseLoginType } from "../../../dall/login-api";
import { useFormik } from "formik";
import {RequestStatusType} from "../../../bll/app-reducer";
import { Checkbox, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type FormikErrorType = {
    email: string
    password: string
}

export const Login = React.memo(()=> {

    const [isPassType, setIsPassType] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector<RequestStatusType>(state => state.app.status);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const user = useSelector<AppStoreType, ResponseLoginType | undefined>(state => state.app.user);



    const params = useParams<"login">();
    console.log(params.login)
    const formik = useFormik({
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (!values.email) {
                errors.email = 'Email Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 8) {
                errors.password = "Invalid password length"
            }
            if (!values.password) {
                errors.password = "Password required"
            }
            return errors;
        },
        initialValues: {
            email: "",
            password: "",
            rememberMe: true,
        },

        onSubmit: (loginParams: LoginParamsType) => {
            dispatch(loginTC(loginParams));
        }
    })
    const handleClickShowPassword = () => {
        setIsPassType(!isPassType);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    useEffect(() => {
        if (user) {
            navigate(searchParams.get("redirectTo") || "/")
        }
    }, [user, navigate, searchParams]) // это редирект на профайл

    return (
        <div className={styles.loginWrapper}>
            <h1 className={styles.h1}>
                It-incubator
            </h1>
            <h2 className={styles.h2}>
                Sign in
            </h2>
            <div className={styles.textFields}>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                    <Input {...formik.getFieldProps("email")}
                    />
                </FormControl>
                {formik.touched.email && formik.errors.email ?
                    <div className={styles.errors}>{formik.errors.email}</div> : null}

                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
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
                    <label className={styles.checkbox}>
                        <Checkbox {...formik.getFieldProps("rememberMe")}
                                  checked={formik.getFieldProps("rememberMe").value}
                                  size="small"
                                  color="secondary" />
                                  <p className={styles.remembMe}>remember Me</p>
                    </label>
                     <NavLink to={PATH.PASS_RECOVERY} className={styles.forgPass}>Forgot Password</NavLink>
                </FormControl>
                <div className={styles.button}>
                    <form onSubmit={formik.handleSubmit} className={styles.submit}>
                        {appStatus === "loading"
                            ? <div className={styles.circularProgress}>
                                <CircularProgress />
                            </div>
                            :
                            <button type="submit" className={styles.loginButton}>Login</button>
                        }
                    </form>
                    <div className={styles.links}>
                        <div className={styles.question}>Don’t have an account?</div>
                        <NavLink to={PATH.REGISTER} className={styles.signUp} >Sign up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
})


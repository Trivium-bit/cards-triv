import React, {useEffect, useState} from "react";
import styles from "./../Register/Register.module.scss";
import {useFormik} from "formik";
import {registerTC} from "../../../../state/registerReduser";
import {RegisterParamsType} from "../../../../api/registerAPI";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import {Button, InputLabel} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Input from "@mui/material/Input";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../AppRoutes";
import {isRegisteredSelector} from "../../../../Common/Selectors/Selectors";
import {projectName} from "../Header/Header";



type FormikErrorType = {
    email: string
    password: string
    confirmPassword: string
}

export const Register = React.memo(()=> {
    const [isPassType, setIsPassType] = useState<boolean>(true);
    const [isConfirmPassType, setConfirmPassIsType] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const isRegistered = useAppSelector<boolean>(isRegisteredSelector);
    const navigate = useNavigate();

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
            if (!values.confirmPassword) {
                errors.confirmPassword = "Please confirm password"
            }
            if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Passwords must match"
            }

            return errors;
        },
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },

        onSubmit: ({email, password}: RegisterParamsType) => {
            dispatch(registerTC({email, password}));
        }
    })
    const handleClickShowPassword = () => {
        setIsPassType(!isPassType);
    };
    const handleClickShowConfPassword = () => {
        setConfirmPassIsType(!isConfirmPassType);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const buttonHandlerRedirect = () =>{
        navigate(PATH.LOGIN);
    }
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                formik.handleSubmit()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [formik]);

    if (isRegistered) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div className={styles.register}>
            <div className={styles.registerWrapper}>
                <h2 className={styles.h1}>
                    {projectName}
                </h2>
                <h2 className={styles.h2}>
                    Sign up
                </h2>
                <div className={styles.textFields}>
                    <FormControl sx={{m: 1, width: '35ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                        <Input {...formik.getFieldProps("email")}/>
                    </FormControl>

                    {formik.touched.email && formik.errors.email ?
                        <div className={styles.emailError}>{formik.errors.email}</div> : null}

                    <FormControl sx={{m: 1, width: '35ch'}} variant="standard">
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
                                           {isPassType ? <VisibilityOff/> : <Visibility/>}
                                       </IconButton>
                                   </InputAdornment>
                               }
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div className={styles.errors}>{formik.errors.password}</div> : null}

                    </FormControl>
                    <FormControl sx={{m: 1, width: '35ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-confirmPassword">Confirm Password</InputLabel>
                        <Input {...formik.getFieldProps("confirmPassword")}
                               id="standard-adornment-confirmPassword"
                               type={isConfirmPassType ? 'password' : 'text'}

                               endAdornment={
                                   <InputAdornment position="end">
                                       <IconButton
                                           aria-label="toggle password visibility"
                                           onClick={handleClickShowConfPassword}
                                           onMouseDown={handleMouseDownPassword}
                                       >
                                           {isConfirmPassType ? <VisibilityOff/> : <Visibility/>}
                                       </IconButton>
                                   </InputAdornment>
                               }
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                            <div className={styles.errors}>{formik.errors.confirmPassword}</div> : null}
                    </FormControl>
                    <div className={styles.buttons}>
                        <Button sx={{textTransform: "none"}} onClick={buttonHandlerRedirect} className={styles.cancelButton}>
                            Cancel
                        </Button>
                        <form onSubmit={formik.handleSubmit}>
                            <Button sx={{textTransform: "none"}} type="submit"
                                    className={styles.registerButton}>Register</Button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
})



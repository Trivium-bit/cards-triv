import React, {useState} from "react";
import styles from "./../Register/Register.module.scss";
import {useFormik} from "formik";
import {RegisterActionsType, registerTC} from "../../../bll/registerReduser";
import {useDispatch} from "react-redux";
import {RegisterParamsType} from "../../../../api/register-API";
import {useAppSelector} from "../../../bll/store";
import {NullableType} from "../../../bll/app-reducer";
import {InputLabel} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Input from "@mui/material/Input";
import { Navigate } from "react-router-dom";


type FormikErrorType = {
    email: string
    password: string
    confirmPassword: string
}

function Register() {
    const [isPassType, setIsPassType] = useState<boolean>(true);
    const [isConfPassType, setConfPassIsType] = useState<boolean>(true);
    const error = useAppSelector<NullableType<string>>(state => state.app.error);
    const dispatch = useDispatch();
    const isRegistered = useAppSelector<boolean>(state => state.register.isRegistered);

    const formik = useFormik({
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (!values.email) {
                errors.email = 'Required';
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
            dispatch<RegisterActionsType>(registerTC({email, password}))
        }
    })
    const handleClickShowPassword = () => {
        setIsPassType(!isPassType)
    };
    const handleClickShowConfPassword = () => {
        setConfPassIsType(!isConfPassType)
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

   if(isRegistered){
       return <Navigate to={"/login"}/>
   }
    return (
        <div className={styles.registerWrapper}>
            <h1 className={styles.h1}>
                It-incubator
            </h1>
            <h2 className={styles.h2}>
                Sign up
            </h2>
            <div className={styles.textFields}>
                <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                    <Input {...formik.getFieldProps("email")}
                    />
                </FormControl>
                {formik.touched.email && formik.errors.email ?
                    <div className={styles.errors}>{formik.errors.email}</div> : null}

                <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
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
                <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                    <Input {...formik.getFieldProps("confirmPassword")}
                           id="standard-adornment-password"
                           type={isConfPassType ? 'password' : 'text'}

                           endAdornment={
                               <InputAdornment position="end">
                                   <IconButton
                                       aria-label="toggle password visibility"
                                       onClick={handleClickShowConfPassword}
                                       onMouseDown={handleMouseDownPassword}
                                   >
                                       {isConfPassType ? <VisibilityOff/> : <Visibility/>}
                                   </IconButton>
                               </InputAdornment>
                           }
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                        <div className={styles.errors}>{formik.errors.confirmPassword}</div> : null}
                </FormControl>
                <div className={styles.errors}>{error}</div>
                <form onSubmit={formik.handleSubmit} className={styles.buttons}>

                    <button className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.registerButton}>
                        Register
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Register;

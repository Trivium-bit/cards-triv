import React from "react";
import styles from "./../Register/Register.module.scss";
import {useFormik} from "formik";
import {RegisterActionsType, registerTC} from "../../../bll/registerReduser";
import {useDispatch} from "react-redux";
import {RegisterParamsType} from "../../../../api/register-API";
import {useAppSelector} from "../../../bll/store";
import {NullableType} from "../../../bll/app-reducer";


type FormikErrorType = {
    email: string
    password: string
    confirmPassword: string
}

function Register() {
    const error = useAppSelector<NullableType<string>>(state => state.app.error)
    const dispatch = useDispatch()
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

        onSubmit: ({email, password}:RegisterParamsType) => {
            dispatch<RegisterActionsType>(registerTC({email, password}))
        }
    })
    return (
        <div className={styles.registerWrapper}>
            <h1 className={styles.h1}>
                It-incubator
            </h1>
            <h2 className={styles.h2}>
                Sign up
            </h2>
            <div className={styles.textFields}>
                <label>Email
                    <input {...formik.getFieldProps("email")}/>
                    {formik.touched.email && formik.errors.email ?
                        <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                </label>

                <label>Password
                    <input {...formik.getFieldProps("password")} type={"password"}/>
                    {formik.touched.email && formik.errors.password ?
                        <div className={styles.errors}>{formik.errors.password}</div> : null}
                </label>

                <label>Confirm password
                    <input {...formik.getFieldProps("confirmPassword")} type={"password"}/>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                    <div className={styles.errors}>{formik.errors.confirmPassword}</div> : null}
                </label>

                <div className={styles.errors}>{error}</div>
                <form onSubmit={formik.handleSubmit} className={styles.buttons}>

                    <button className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button  type="submit" className={styles.registerButton}>
                        Register
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Register;

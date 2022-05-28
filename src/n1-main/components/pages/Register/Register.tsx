import React from "react";
import styles from "./../Register/Register.module.scss";
import {useFormik} from "formik";

type FormikErrorType = {
    email: string
    password: string
    confirmPassword: string
}

function Register() {
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
                errors.confirmPassword = "Passwords must be equal"
            }

            return errors;
        },
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values))
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
                    <input {...formik.getFieldProps("password")}/>
                    {formik.touched.email && formik.errors.password ?
                        <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                </label>

                <label>Confirm password
                    <input {...formik.getFieldProps("confirmPassword")}/>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                        <div style={{color: "red"}}>{formik.errors.confirmPassword}</div> : null}
                </label>

                <form onSubmit={formik.handleSubmit} className={styles.buttons}>

                    <button className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button className={styles.registerButton}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;

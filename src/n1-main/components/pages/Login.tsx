import {NavLink, useNavigate} from "react-router-dom";
import { PATH } from "../Routings";
import s from "../../ui/Login.module.css";
import {useEffect, useState} from "react";
import Input from "../Input/Input";
import { AppStoreType, useAppDispatch } from "../../bll/store";
import { loginTC } from "../../../n2-features/f1-auth/a1-login/auth-reducer";
import { useSelector } from "react-redux";

function Login() {

    const navigate = useNavigate();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.authReducer.isLoggedIn)
    const dispatch = useAppDispatch();

    let [email, setEmail] = useState<string>('')
    let [password, setPassword] = useState<string>('')
    let [rememberMe, setRememberMe] = useState<boolean>(false)

    const onSubmit = () => {
        dispatch(loginTC(email,password,rememberMe))
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate(PATH.PROFILE)
        }
    }, [])

    return (
        <div>
            <form className={s.loginForm} onSubmit={onSubmit}>
                <label >Email</label>
                <Input type="email" value={email} onChange={setEmail} />
                <label >Password</label>
                <Input type="password" value={password} onChange={setPassword} />
                <input type="checkbox" onChange={() => setRememberMe(rememberMe)} />
                <label>Remember me</label>
                <input type="submit" value="Login" />
            </form>
            <NavLink to={PATH.PASS_RECOVERY} className={s.link} >Password Recovery</NavLink>
        </div>
    );
}

export default Login;

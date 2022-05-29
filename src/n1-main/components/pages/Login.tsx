import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import { PATH } from "../Routings";
import s from "../../ui/Login.module.css";
import {useEffect, useState} from "react";
import Input from "../Input/Input";
import { AppStoreType, useAppDispatch } from "../../bll/store";
import { loginTC } from "../../../n2-features/f1-auth/a1-login/auth-reducer";
import { useSelector } from "react-redux";
import {ResponseLoginType} from "../../dall/login-api";

function Login() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const user = useSelector<AppStoreType, ResponseLoginType | undefined>(state => state.app.user)
    const dispatch = useAppDispatch();

    let [email, setEmail] = useState<string>('')
    let [password, setPassword] = useState<string>('')
    let [rememberMe, setRememberMe] = useState<boolean>(false)

    const onSubmit = () => {
        dispatch(loginTC(email,password,rememberMe))
    }

    useEffect(() => {
        if (user) {
            navigate(searchParams.get("redirectTo") || "/")
        }
    }, [user])

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
            <NavLink to={PATH.REGISTER} className={s.link} >Sing up</NavLink>
        </div>
    );
}

export default Login;

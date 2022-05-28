import { NavLink } from "react-router-dom";
import { PATH } from "../Routings";
import s from "../../ui/Login.module.css";
import { useState } from "react";
import Input from "../Input/Input";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../bll/store";
import { IsLoggedInActionsType, loginTC } from "../../../n2-features/f1-auth/a1-login/auth-reducer";
import { useDispatch } from "react-redux";

function Login() {

    const dispatch: ThunkDispatch<AppStateType, { email: string, password: string, rememberMe: boolean }, IsLoggedInActionsType> = useDispatch()

    let [email, setEmail] = useState<string>('')
    let [password, setPassword] = useState<string>('')
    let [rememberMe, setRememberMe] = useState<boolean>(false)

    const onSubmit = () => {
        dispatch(loginTC(email, password, rememberMe))
    }

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

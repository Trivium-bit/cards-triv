import { NavLink } from "react-router-dom";
import { PATH } from "../Routings";
import s from "../../ui/Login.module.css";
import { useState } from "react";
import Input from "../Input/Input";

function Login() {

    let [email, setEmail] = useState<string>('')
    let [password, setPassword] = useState<string>('')
    let [rememberMe, setRememberMe] = useState<boolean>(false)

    return (
        <div>
            <form className={s.loginForm}>

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

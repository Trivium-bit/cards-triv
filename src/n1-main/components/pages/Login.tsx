import { NavLink } from "react-router-dom";
import Input from "../c1-Input/Input";
import Button from "../c2-Button/Button";
import Checkbox from "../c3-Checkbox/Checkbox";
import { PATH } from "../Routings";
import s from "../../ui/Login.module.css";

function Login() {
    return (
        <div className={s.login}>
            <Input />
            <Input />
            <Button />
            <Checkbox />
            <NavLink to={PATH.PASS_RECOVERY} className={s.link} >Password Recovery</NavLink>
        </div>
    );
}

export default Login;

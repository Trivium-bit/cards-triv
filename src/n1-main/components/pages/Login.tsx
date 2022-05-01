import Input from "../c1-Input/Input";
import Button from "../c2-Button/Button";
import Checkbox from "../c3-Checkbox/Checkbox";
import s from "./Login.module.css"

function Login() {
    return (
        <div className={s.login}>
            <Input />
            <Input />
            <Button />
            <Checkbox />
        </div>
    );
}

export default Login;

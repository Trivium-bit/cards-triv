import Input from "../c1-Input/Input";
import s from "../../ui/PasswordRecovery.module.css"

function PassRecovery() {
    return (
        <div className={s.passRecovery}>
            <Input placeholder="email" />
        </div>
    );
}

export default PassRecovery;
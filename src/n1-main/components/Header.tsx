import { NavLink } from "react-router-dom";
import s from "../ui/Header.module.css";
import { PATH } from './Routings'

function Header() {
  return (
    <div className="Header">
      <NavLink to={PATH.LOGIN} className={s.link} ><button className={s.button}>Login</button></NavLink>
      <NavLink to={PATH.REGISTER} className={s.link} ><button className={s.button}>Register</button></NavLink>
      <NavLink to={PATH.PROFILE} className={s.link} ><button className={s.button}>Profile</button></NavLink>
      <NavLink to={PATH.NEW_USER} className={s.link} ><button className={s.button}>NewUser</button></NavLink>
      <NavLink to={PATH.PASS_RECOVERY} className={s.link} ><button className={s.button}>Password_Recovery</button></NavLink>
    </div>
  );
}

export default Header;

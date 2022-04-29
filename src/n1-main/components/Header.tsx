import React from "react";
import { NavLink } from "react-router-dom";
import s from "../ui/Header.module.css";
import { PATH } from '../../n3-common/Routes'
import menu_icon from '../../images/menu_icon.png'

function Header() {
  return (
    <div className="Header">
            <NavLink to={PATH.LOGIN} className={s.link} >Login</NavLink>
            <NavLink to={PATH.REGISTER} className={s.link} >Register</NavLink>
            <NavLink to={PATH.PROFILE} className={s.link} >Profile</NavLink>
            <NavLink to={PATH.NEW_USER} className={s.link} >NewUser</NavLink>
            <NavLink to={PATH.PASS_RECOVERY} className={s.link} >PassRecovery</NavLink>
            <div className={s.block}> <img src={menu_icon} alt={"menu_icon"} className={s.logo} /> </div>
    </div>
  );
}

export default Header;

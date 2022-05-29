import { NavLink } from "react-router-dom";
import s from "../ui/Header.module.css";
import { PATH } from './Routings'
import React from "react";
import {useAppDispatch} from "../bll/store";
import {userLogOutAC} from "../bll/app-reducer";

function Header() {
    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        dispatch(userLogOutAC())
    }
  return (
    <div className={s.menu}>
        <NavLink to={PATH.HOME} className={s.link} >IT INCUBATOR</NavLink>
        <NavLink to={PATH.PACKS} className={s.link} >PACKS</NavLink>
        <NavLink to={PATH.PROFILE} className={s.link} >Profile</NavLink>
        <span className={s.link} onClick={handleLogOut}>Log Out</span>
    </div>
  );
}

export default Header;

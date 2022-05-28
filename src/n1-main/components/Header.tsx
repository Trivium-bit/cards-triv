import { NavLink } from "react-router-dom";
import s from "../ui/Header.module.css";
import { PATH } from './Routings'
import React from "react";
import {useDispatch} from "react-redux";
import {registerAC} from "../bll/registerReduser";

function Header() {
    const dispatch = useDispatch()
    const changeRegisterStatus =() =>{
        dispatch(registerAC(false))
    }
  return (
    <div className={s.menu}>
      <NavLink to={PATH.LOGIN} className={s.link}>Login</NavLink>
      <NavLink onClick={changeRegisterStatus} to={PATH.REGISTER} className={s.link} >Register</NavLink>
      <NavLink to={PATH.PROFILE} className={s.link} >Profile</NavLink>
      <NavLink to={PATH.NEW_USER} className={s.link} >NewUser</NavLink>
    </div>
  );
}

export default Header;

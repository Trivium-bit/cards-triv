import { Route, Routes } from 'react-router-dom'
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import PassRecovery from "./pages/PassRecovery";
import Profile from "./pages/Profile";
import Register from "./pages/Register/Register";
import React from "react";

export const PATH = {
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  NEW_USER: "/new-user",
  PASS_RECOVERY: "/pass-recovery"
}

function Routings() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.NEW_USER} element={<NewUser />} />
        <Route path={PATH.PASS_RECOVERY} element={<PassRecovery />} />
        <Route element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default Routings;

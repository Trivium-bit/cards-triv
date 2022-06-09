import React from "react";
import {Navigate, Route, Routes } from 'react-router-dom'
import {PassRecovery} from "./pages/PassRecovery/PassRecovery";
import Profile from "./pages/Profile/Profile";
import PacksContainer from './pages/Packs/PacksContainer';
import PrivateRoutes from "./PrivateRoutes";
import Home from "./pages/Home";
import CreateNewPassword from './pages/CreateNewPassword/CreateNewPassword';
import {CheckEmail} from "./pages/CheckEmail/CheckEmail";
import {Login} from "./pages/Login/Login";
import {Register} from "./pages/Register/Register";
import {Error404} from "./pages/Error404/Error404";
import CardDetails from "./pages/Packs/CardDetails";

export const PATH = {
  HOME: "/",
  PACKS: "/packs",
  PACKS_DETAILS: '/packs/:packId',
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  NEW_USER: "/new-user",
  PASS_RECOVERY: "/pass-recovery",
  CREATE_NEW_PASSWORD: "/set-new-password/:token",
  CHECK_EMAIL: "/check-email",
  ERROR404: "/404",
  ANY_ROUTE:"*"
}

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.PASS_RECOVERY} element={<PassRecovery />} />
        <Route path={PATH.CREATE_NEW_PASSWORD} element={<CreateNewPassword />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>} />
        <Route element={<PrivateRoutes />}>
          <Route path={PATH.PACKS} element={<PacksContainer />} />
          <Route path={PATH.PACKS_DETAILS} element={<CardDetails />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
        </Route>
        <Route path={PATH.ANY_ROUTE} element={<Navigate to={PATH.ERROR404}/>} />
        <Route path={PATH.ERROR404} element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;

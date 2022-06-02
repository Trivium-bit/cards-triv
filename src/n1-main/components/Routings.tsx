import { Route, Routes } from 'react-router-dom'
import Error404 from "./pages/Error404";
import Login from "./pages/Login/Login";
import {PassRecovery} from "./pages/PassRecovery/PassRecovery";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Packs from './pages/Packs/Packs';
import PrivateRoutes from "./PrivateRoutes";
import Home from "./pages/Home";
import CreateNewPassword from './pages/CreateNewPassword/CreateNewPassword';
import {CheckEmail} from "./pages/CheckEmail/CheckEmail";

export const PATH = {
  HOME: "/",
  PACKS: "/packs",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  NEW_USER: "/new-user",
  PASS_RECOVERY: "/pass-recovery",
  CREATE_NEW_PASSWORD: "/create-new-password/",
  CHECK_EMAIL: "/check-email",
}

function Routings() {
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
          <Route path={PATH.PACKS} element={<Packs />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
        </Route>
        <Route element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default Routings;

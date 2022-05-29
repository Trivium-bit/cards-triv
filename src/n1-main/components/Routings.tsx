import { Route, Routes } from 'react-router-dom'
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import PassRecovery from "./pages/PassRecovery/PassRecovery";
import Profile from "./pages/Profile";
import Register from "./pages/Register/Register";
import Packs from './pages/Packs';
import PrivateRoutes from "./PrivateRoutes";
import Home from "./pages/Home";

export const PATH = {
  HOME: "/",
  PACKS: "/packs",
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
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.PASS_RECOVERY} element={<PassRecovery />} />
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

import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Error404 from "../n1-main/components/pages/Error404";
import Login from "../n1-main/components/pages/Login";
import NewUser from "../n1-main/components/pages/NewUser";
import PassRecovery from "../n1-main/components/pages/PassRecovery";
import Profile from "../n1-main/components/pages/Profile";
import Register from "../n1-main/components/pages/Register";

export const PATH = {
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  NEW_USER: "/new-user",
  PASS_RECOVERY: "/pass-recovery"
}

function Routings() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default Routings;

import {  useSelector } from "react-redux";
import {AppStoreType} from "../../bll/store";
import {ResponseLoginType} from "../../dall/login-api";

const Profile = () => {
    const user = useSelector<AppStoreType, ResponseLoginType | undefined>((state) => state.app.user);

    return (
        <div>
            {user ? (
                <div>
                    {user.name}
                </div>
            ) : (<div>
                ... loading
            </div>)}
        </div>
    );
};

export default Profile;

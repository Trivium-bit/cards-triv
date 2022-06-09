import {ResponseLoginType} from "./loginAPI";
import {instance} from "./instance";


export type UserProfileType = {
    token: string
    tokenDeathTime: number
    updatedUser: ResponseLoginType
}
export const profileAPI = {
    getProfile() {
        return instance.post<UserProfileType>("auth/me");
    },
    updateProfile(name: string |undefined, avatar: string |undefined) {
        return instance.put<UserProfileType>("auth/me", {name, avatar}
        );
    }

}
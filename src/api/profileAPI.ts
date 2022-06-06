import axios from 'axios'
import {ResponseLoginType} from "./loginAPI";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

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
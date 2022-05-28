import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true,
})

export interface ProfileApiResponseType {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    token: string;
    tokenDeathTime: number;
    avatar: string;
}

export const profileAPI = {
    getProfile() {
        return instance.post<ProfileApiResponseType>("auth/me");
    },
}
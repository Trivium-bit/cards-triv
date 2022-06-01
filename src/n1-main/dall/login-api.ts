import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
}
export type NewPasswordType = {
    password: string,
    resetPasswordToken: string,
}

export const authAPI = {
    login({email, password, rememberMe}: LoginParamsType) {
        const promise = instance.post<ResponseLoginType>('auth/login', { email, password, rememberMe });
        return promise;
    },
    setNewPassword({ password, resetPasswordToken }: NewPasswordType) {
        const promise = instance.post<ResetPasswordType>('/auth/set-new-password', { password, resetPasswordToken });
        return promise;
    }
}

//types
export type ResponseLoginType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
export type ResetPasswordType = {
    info: string
    error: string;
}

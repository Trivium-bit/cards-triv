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
    resetPasswordToken: string
}

export const authAPI = {
    login({ email, password, rememberMe }: LoginParamsType) {
        return instance.post<ResponseLoginType>('auth/login', {email, password, rememberMe});
    },
    setNewPassword({ password, resetPasswordToken }: NewPasswordType) {
        return instance.post<ResponseResetPasswordType>('/auth/set-new-password', {password, resetPasswordToken});
    },
    me() {
        return instance.post<ResponseLoginType>(`/auth/me`, {});
    },
    logOut() {
        return instance.delete<{ info: string, error: string }>(`/auth/me`);
    }
}

//types
export type ResponseLoginType = {
    name: string ;
    email: string;
    _id: string ;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;// подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
export type ResponseResetPasswordType = {
    info: string
    error?: string;
}

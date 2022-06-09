import {instance} from "./instance";

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
    authMe() {
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
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;// подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
export type ResponseResetPasswordType = {
    info: string
    error?: string;
}

import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true,
})
export type RegisterParamsType = {
    email: string
    password: string
}

type RegisterResponse ={
    addedUser: {
        created: string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: false
        updated: string
        verified: boolean
        __v: number
        _id: string
    }
    error?: string;
}

export const registerAPI = {
    register(values:RegisterParamsType){
        return instance.post<RegisterResponse>(`/auth/register`, values)
    }
}
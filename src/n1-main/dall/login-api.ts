import axios from 'axios'

export const instance = axios.create({ 
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true, 
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        const promise = instance.post<ResponseLoginType>('auth/login', {email, password, rememberMe});
        return promise;
    },
   }

//types
export type ResponseLoginType<D = {}> = { 
        _id: string; 
        email: string; 
        name: string; 
        avatar?: string; 
        publicCardPacksCount: number; // количество колод        
        created: Date; 
        updated: Date; 
        isAdmin: boolean; 
        verified: boolean; // подтвердил ли почту 
        rememberMe: boolean; 
        error?: string; 
}

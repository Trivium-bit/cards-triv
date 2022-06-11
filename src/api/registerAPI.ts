import {RecoveryEmailType} from "../n1-main/components/pages/PassRecovery/PassRecovery";
import {instance} from "./instance";

export type RegisterParamsType = {
    email: string
    password: string
}

type RegisterResponse = {
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
    registerReducer(values: RegisterParamsType) {
        return instance.post<RegisterResponse>(`/auth/register`, values)
    }
}

export const forgotPassAPI = {
    forgotPass(email: RecoveryEmailType) {
        return instance.post(`/auth/forgot`,
            {
                    email:email.email,
                    // кому восстанавливать пароль
                    from: "test-front-admin <dmitryLotkov9@gmail.com>",
                    // можно указать разработчика фронта)
                    message: `<div style="background-color: #f7f7f7; padding: 15px">
                        Follow 
                        <a href='https://trivium-bit.github.io/cards-triv/#/set-new-password/$token$'
                        style="font-weight: bold; color: #1a73e8;">
                        this link</a> to recover your password
                        </div>` // хтмп-письмо, вместо $token$ бэк вставит токен

            }
        )
    }
}
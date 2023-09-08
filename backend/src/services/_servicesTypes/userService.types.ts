import { type ObjectId } from 'mongoose'

export interface _user {
    _id: ObjectId | string
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    role: number
    accountStatus: boolean
    activationToken: string | undefined
    recoverPasswordToken: string | undefined
    tries: number | undefined
}

export interface userRegisterType {
    firstname: string
    lastname: string
    username: string
    password: string
    email: string
    activationToken: string
}

export interface userDeleteType {
    _user: _user
    password: string
}

export interface userLoginType {
    username: string
    password: string
}

export interface userAuthenticateType {
    token: string
}

export interface sendRecoveryEmailType {
    email: string
}

export interface userChangePasswordType {
    token: string
    password: string
}

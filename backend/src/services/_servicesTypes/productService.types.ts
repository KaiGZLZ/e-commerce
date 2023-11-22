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

export interface productRegisterType {
    _user: _user

    name: string
    price: number
    description: string
    category: string
    subCategory: string
    tags: string[]
    wholesalePrice: number | undefined
    orderMinForWholesale: number | undefined
    stock: number
}

export interface productDeleteType {
    _user: _user
    data: {
        id: ObjectId | string
    }
}

export interface productUpdateType extends productRegisterType {
    productId: ObjectId | string
}

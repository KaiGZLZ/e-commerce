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

interface saleProduct {
    product: ObjectId | string
    name: string
    price: number
    wholesalePrice: number
    orderMinForWholesale: number
    images: string

    quantity: number
    exchangeRate: number
    total: number
}

export interface saleRegisterType {
    _user: _user
    sale: {
        user: ObjectId | string
        products: saleProduct[]
        total: number
        exchangeRate: number
        comment: string
    }
}

export interface saleCancelType {
    _user: _user
    id: ObjectId | string
}

export interface saleGetType {
    _user: _user
    id: ObjectId | string
}

export interface saleChangePaymentStatusType {
    _user: _user
    sale: {
        id: ObjectId | string
    }
}

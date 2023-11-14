import { type ObjectId } from 'mongoose'

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

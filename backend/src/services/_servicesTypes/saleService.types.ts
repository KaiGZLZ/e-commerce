import { type ObjectId } from 'mongodb'

interface saleProduct {
    _id: ObjectId | string
    product: ObjectId | string
    name: string
    price: number
    wholesalePrice: number
    orderMinForWholesale: number
    images: string

    quantity: number
    total: number
}

export interface saleRegisterType {
    token: string | null
    products: saleProduct[]
    total: number
    exchangeRate: number
    email: string

    user: ObjectId | undefined
}

export interface saleCancelType {
    _user: _user
    id: ObjectId | string
}

export interface saleGetByIdType {
    token: string
    id: string
}

export interface saleChangePaymentStatusType {
    _user: _user
    sale: {
        id: ObjectId | string
    }
}

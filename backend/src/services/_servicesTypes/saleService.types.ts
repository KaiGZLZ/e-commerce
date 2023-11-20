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

export interface saleGetByIdType {
    token: string
    id: string
}

export interface salePaymentConfirmationType {
    _user: _user
    saleId: string
    paymentMethod: number
    paymentReference: string
    paymentDate: string
}

export interface salePaymentRejectionType {
    _user: _user
    saleId: string
    rejectionReason: string
}

export interface saleSentPackageType {
    _user: _user
    saleId: string
    trackingCode: string
}

export interface salePackageReceivedType {
    _user: _user
    saleId: string
    rating: number
    comment: string
}

/** *************************************************** */

export interface saleCancelType {
    _user: _user
    id: ObjectId | string
}

export interface saleChangePaymentStatusType {
    _user: _user
    sale: {
        id: ObjectId | string
    }
}

import { type ObjectId } from 'mongoose'

export interface categoryRegisterType {
    _user: _user
    name: string
    description: string
}

export interface productDeleteType {
    _user: _user
    data: {
        id: ObjectId | string
    }
}

export interface productUpdateType {
    _user: _user
    product: {
        id: ObjectId | string
        name: string
        price: number
        description: string
        category: string
        subCategory: string
        tags: string[]
        wholesalePrice: number | undefined
        orderMinForWholesale: number | undefined
        stock: number
        updatedDate: Date | undefined
    }
}

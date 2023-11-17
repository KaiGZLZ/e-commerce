import mongoose from 'mongoose'
import salesEnum from '../__helpers/enums/sales.enum'

const { Schema } = mongoose

const productSchema: any = new Schema(
    {
        product: { type: 'ObjectId', ref: 'Product', required: true },

        // Product data at the moment of the sale
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        wholesalePrice: { type: Number, default: 0 },
        category: { type: String, required: true },
        orderMinForWholesale: { type: Number, default: 0 },
        images: [String],

        quantity: { type: Number, required: true },
        total: { type: Number, required: true }

    }, { _id: false }
)

const salesSchema: any = new Schema(
    {
        user: { type: 'ObjectId', ref: 'User' },
        email: { type: String, required: true },
        products: [productSchema],
        total: { type: Number, required: true },
        status: { type: Number, default: salesEnum.status.pendingPayment }
    },
    {
        toJSON: {
            virtuals: true,
            transform: function(_doc: any, ret: any) {
                delete ret._id
            }
        },
        timestamps: true
    }
)

export = mongoose.model('Sale', salesSchema)

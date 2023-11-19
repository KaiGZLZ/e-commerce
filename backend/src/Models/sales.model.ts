import mongoose from 'mongoose'
import salesEnum from '../__helpers/enums/sales.enum'
const { Schema } = mongoose

interface productSchemaType {
    product: mongoose.Types.ObjectId

    // Product data at the moment of the sale
    name: string
    description: string
    price: number
    wholesalePrice: number
    category: string
    orderMinForWholesale: number
    images: string[]

    quantity: number
    total: number
}

interface salesSchemaType {
    user: mongoose.Types.ObjectId
    email: string
    products: productSchemaType[]
    total: number
    totalQuantity: number
    status: number
    paymentMethod: string
}

const productSchema: any = new Schema<productSchemaType>(
    {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },

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

const salesSchema = new Schema<salesSchemaType>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        email: { type: String, required: true },
        products: [productSchema],
        total: { type: Number, required: true },
        totalQuantity: { type: Number, required: true },
        status: { type: Number, default: salesEnum.status.pendingPayment },
        paymentMethod: {
            type: String,
            required: function(this: salesSchemaType) {
                return this.status !== salesEnum.status.pendingPayment
            }
        }
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

export = mongoose.model<salesSchemaType>('Sale', salesSchema)

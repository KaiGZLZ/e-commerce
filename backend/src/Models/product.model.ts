import mongoose, { SchemaTypes } from 'mongoose'

const { Schema } = mongoose

const productSchema: any = new Schema(
    {
        user: { type: SchemaTypes.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        rating: { type: Number, default: 0 },
        numberOfVotes: { type: Number, default: 0 },
        category: { type: String, required: true },
        tags: [String],
        lastPrice: { type: Number, default: 0 },
        wholesalePrice: { type: Number, default: 0 },
        lastWholesalePrice: { type: Number, default: 0 },
        orderMinForWholesale: { type: Number, default: 0 },
        images: [String],
        stock: { type: Number, default: 0 }
    },
    {
        timestamps: true
    }
)

export = mongoose.model('Product', productSchema)

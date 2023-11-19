import mongoose from 'mongoose'
const { Schema } = mongoose

interface productSchemaType {
    user: mongoose.Types.ObjectId

    name: string
    price: number
    description: string
    rating: number
    numberOfVotes: number
    category: string
    tags: string[]
    lastPrice: number
    wholesalePrice: number
    lastWholesalePrice: number
    orderMinForWholesale: number
    images: string[]
    stock: number
}

const productSchema = new Schema<productSchemaType>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
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

export = mongoose.model<productSchemaType>('Product', productSchema)

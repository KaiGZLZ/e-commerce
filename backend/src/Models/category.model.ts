import mongoose from 'mongoose'
const { Schema } = mongoose

interface categorySchemaType {
    name: string
    subCategories: mongoose.Types.ObjectId[]
    description: string
}

const categorySchema = new Schema<categorySchemaType>({
    name: { type: String, required: true, trim: true, unique: true },
    subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
    description: { type: String, required: true, trim: true }
}, { timestamps: true })

export = mongoose.model<categorySchemaType>('Category', categorySchema)

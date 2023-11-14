import mongoose from 'mongoose'
const { Schema } = mongoose

const categorySchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    subCategories: [{ type: 'ObjectId', ref: 'SubCategory' }],
    description: { type: String, required: true, trim: true }
}, { timestamps: true })

export = mongoose.model('Category', categorySchema)

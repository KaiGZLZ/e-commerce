import mongoose from 'mongoose'
import moment from 'moment'

const { Schema } = mongoose

const productSchema: any = new Schema(
    {
        user: { type: 'ObjectId', ref: 'User' },
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
        stock: { type: Number, default: 0 },
        createdDate: { type: Date, default: getTimeZoneDate },
        updatedDate: { type: Date }

    }, {
        toJSON: {
            virtuals: true,
            transform: function(_doc: any, ret: any) {
                delete ret._id
            }
        }
    }
)

// Get date with Venezuela time
function getTimeZoneDate(): moment.Moment {
    return moment().subtract(4, 'hours')
}

export = mongoose.model('Product', productSchema)

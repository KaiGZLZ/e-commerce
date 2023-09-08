import mongoose from 'mongoose'
import moment, { type Moment } from 'moment'

const { Schema } = mongoose

const commentSchema = new Schema({

    user: { type: 'ObjectId', ref: 'User' },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    createdDate: { type: Date, default: getTimeZoneDate }
})

const commentsSchema = new Schema(
    {
        product: { type: 'ObjectId', ref: 'Product' },
        comments: [commentSchema]
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
function getTimeZoneDate(): Moment {
    return moment().subtract(4, 'hours')
}

export = mongoose.model('Comment', commentsSchema)

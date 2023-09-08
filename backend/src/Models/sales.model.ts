import mongoose from 'mongoose'
import moment from 'moment'
import salesEnum from '../__helpers/enums/sales.enum'

const { Schema } = mongoose

const productSchema: any = new Schema(
    {
        product: { type: 'ObjectId', ref: 'Product' },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        wholesalePrice: { type: Number, default: 0 },
        orderMinForWholesale: { type: Number, default: 0 },
        images: { type: String, default: '' },

        quantity: { type: Number, required: true },
        exchangeRate: { type: Number, required: true },
        total: { type: Number, required: true }
    }
)

const salesSchema: any = new Schema(
    {
        user: { type: 'ObjectId', ref: 'User' },
        products: [productSchema],
        total: { type: Number, required: true },
        exchangeRate: { type: Number, required: true },
        comment: { type: String, required: true },
        status: { type: Number, default: salesEnum.status.pendingPayment },
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

export = mongoose.model('Sale', salesSchema)

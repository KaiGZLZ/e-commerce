import mongoose from 'mongoose'
import userEnum from '../__helpers/enums/user.enum'

const { Schema } = mongoose

interface userSchemaType {
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    role: number

    accountStatus: boolean
    activationToken: string

    recoverPasswordToken: string

    tries: number
}

const userSchema = new Schema<userSchemaType>(
    {
        username: { type: String, required: true, unique: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: Number, default: userEnum.roles.user },

        accountStatus: { type: Boolean, default: false }, // If the account is activated or not
        activationToken: { type: String, default: '' },

        recoverPasswordToken: { type: String, default: '' },

        tries: { type: Number, default: 0 }
    }, {
        // The id and password are deleted at the time of sending the data to the client
        toJSON: {
            virtuals: true,
            transform: function(_doc: any, ret: any) {
                delete ret._id
                delete ret.id
                delete ret.password
                delete ret.activationToken
                delete ret.recoverPasswordToken
            }
        }
    }
)

export = mongoose.model<userSchemaType>('User', userSchema)

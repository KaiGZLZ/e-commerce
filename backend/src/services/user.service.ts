import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

import config from '../config'
import User from '../Models/user.model'

import sendMail from '../__helpers/sendEmail'
import { activateAccountMail } from '../mailTemplates/user.mails'
import { type userUpdateType, type getUserByUsernameType, type sendRecoveryEmailType, type userAuthenticateType, type userChangePasswordType, type userDeleteType, type userLoginType, type userRegisterType } from './_servicesTypes/userService.types'
import userEnum from '../__helpers/enums/user.enum'
import mongoose from 'mongoose'

/** Funtion to register an user
 *
 * @param {object} data._user - Users firstname
 * @param {string} data.firstname - Users firstname
 * @param {string} data.lastname - Users lastname
 * @param {string} data.username - Users username
 * @param {string} data.password - Users password
 * @param {string} data.email - Users email
 *
 */
export async function userRegister(data: userRegisterType): Promise<object> {
    // The password will be encrypted
    const encryptedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
    data.password = encryptedPassword

    const activationToken = bcrypt.hashSync(new Date().toString() + data.password + config.SECRET, bcrypt.genSaltSync(10))
    data.activationToken = activationToken

    if (data.username === 'admin') {
        data.role = userEnum.roles.admin
    }

    const session = await mongoose.connection.startSession()

    try {
        session.startTransaction()
        const newUser = new User(data)
        await newUser.save({ session })

        // The confirmation email will be sent

        const subject = 'E-Commerce Confirmation Email'
        const text = 'To confirm the email'
        const html = activateAccountMail(process.env.URL_CONFIRMATION_EMAIL, activationToken)

        try {
            await sendMail(data.email, subject, text, html)
        } catch (e) {
            throw new Error('There was a problem sending the email. Please try again later')
        }

        await session.commitTransaction()
        await session.endSession()

        return {
            message: 'User added successfully'
        }
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw error
    }
}

export async function getUserByUsername(data: getUserByUsernameType): Promise<object> {
    const user = data._user

    if (user.role === userEnum.roles.user) {
        if (user.username === data.username) {
            return {
                result: user,
                message: 'User searched successfully'

            }
        } else {
            throw new Error('You do not have permission to perform this action')
        }
    } else {
        const userToSend = await User.findOne({ username: data.username }).lean()
        return {
            result: userToSend,
            message: 'User searched successfully'
        }
    }
}

export async function userUpdate(data: userUpdateType): Promise<object> {
    const user = data._user

    const existingUser = await User.findById(data.userId)

    if (!existingUser) throw new Error('The user does not exist')

    // Just the admin can change the role
    if (user.role === userEnum.roles.admin) {
        Object.assign(existingUser, data)
    } else if (user.role === userEnum.roles.user) {
        delete data.role
        Object.assign(existingUser, data)
    }

    const existingUserSaved = await existingUser.save()

    return {
        message: 'User updated successfully',
        result: existingUserSaved
    }
}

/** Funtion to Delete an user
 *
 * @param {object} data
 * @param {object} data._user - username
 * @param {string} data.password - password
 *
 */
export async function userDelete(data: userDeleteType): Promise<object> {
    const passwordUsernameToDelete = data.password

    const result = bcrypt.compareSync(passwordUsernameToDelete, data._user.password)

    if (result) {
        await User.findOneAndDelete({ username: data._user.username })

        return {
            result: true,
            message: 'User deleted successfully'
        }
    } else {
        return {
            result: false,
            message: 'Password is incorrect'
        }
    }
}

/** Funtion to login an user
 *
 * @param {object} data -
 * @param {string} data.username - Users username
 * @param {string} data.password - Users password
 *
 */
export async function userLogin(data: userLoginType): Promise<object> {
    // Look if there is an user with the same username
    const user = await User.findOne({ username: data.username })

    if (!user) throw new Error('There is a problem with the username or the password')

    if (!user.accountStatus) throw new Error('You must activate your account')

    const result = bcrypt.compareSync(data.password, user.password)

    if (result) {
        const token = jsonwebtoken.sign({ sub: user.id }, config.SECRET, { expiresIn: 60 * 60 }) // Expiration time: 1h

        return {
            user: {
                ...user.toJSON()
            },
            token,
            message: 'User logged successfully'
        }
    } else throw new Error('There is a problem with the username or the password')
}

/** Funtion to authenticate the email from an user
 *
 * @param {object} data -
 * @param {string} data.user - Users username
 * @param {string} data.password - Users password
 *
 */
export async function userAuthenticate(data: userAuthenticateType): Promise<object> {
    const activationToken = data.token

    const user = await User.findOne({ activationToken })

    if (!user) {
        throw new Error('Invalid activation token')
    } else {
        if (user.accountStatus) {
            throw new Error('Your account was already activated. Please Loggin normally')
        }
    }

    user.accountStatus = true
    user.activationToken = ''

    const userSaved = await user.save()

    const token = jsonwebtoken.sign({ sub: userSaved.id }, config.SECRET, { expiresIn: 60 * 60 }) // Expiration time: 1h

    return {
        user: {
            ...user.toJSON()
        },
        token,
        message: 'User authenticated successfully'
    }
}

/** Funtion to send an recovery email if the password was forgotten
 *
 * @param {object} data -
 * @param {string} data.email - User email
 *
 */
export async function sendRecoveryEmail(data: sendRecoveryEmailType): Promise<void> {
    const email = data.email

    const user = await User.findOne({ email })

    if (!user) throw new Error('No user is registered with this email')

    const recoverPasswordToken = bcrypt.hashSync(new Date().toString() + user.password + config.SECRET, bcrypt.genSaltSync(10))

    user.recoverPasswordToken = recoverPasswordToken

    await user.save()

    // The email will be sent with the link to recover the password

    const subject = 'E-Commerce Recover Password'
    const text = 'To confirm the email'
    const html = activateAccountMail(process.env.URL_RECOVER_PASSWORD, recoverPasswordToken)

    await sendMail(user.email, subject, text, html)
}

/** Funtion to change the user password
 *
 * @param {object} data -
 * @param {string} data.token - Users username
 * @param {string} data.password - Users password
 *
 */
export async function userChangePassword(data: userChangePasswordType): Promise<object> {
    const recoverPasswordToken = data.token
    const password = data.password

    const user = await User.findOne({ recoverPasswordToken })

    if (!user) {
        throw new Error('Invalid activation token')
    }

    const result = bcrypt.compareSync(password, user.password)

    if (result) {
        throw new Error('The password cannot be the same as the one passed')
    }

    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    user.password = encryptedPassword

    user.recoverPasswordToken = ''

    await user.save()

    return {
        message: 'The password was changed successfully'
    }
}

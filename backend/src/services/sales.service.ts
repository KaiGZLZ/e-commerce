import SaleModel from '../Models/sales.model'
import User from '../Models/user.model'
import ProductModel from '../Models/product.model'
import * as jwt from 'jsonwebtoken'
import sendMail from '../__helpers/sendEmail'
import { saleRegisterMail } from '../mailTemplates/sales.mails'
import { type saleRegisterType, type saleGetByIdType, type salePaymentConfirmationType, type salePaymentRejectionType, type saleSentPackageType, type salePackageReceivedType } from './_servicesTypes/saleService.types'
import userEnum from '../__helpers/enums/user.enum'
import saleEnum from '../__helpers/enums/sales.enum'
import config from '../config'
import { ConflictError, UnauthorizedError } from '../__helpers/customErrors'

export async function saleRegister(data: saleRegisterType): Promise<object> {
    // Verify that the sale was made by an user
    if (data.token) {
        try {
            const decodedToken = jwt.verify(data.token, config.SECRET)
            const user = await User.findById(decodedToken.sub).lean()

            if (!user) throw new Error('The token is invalid')

            data.user = user._id
            data.email = user.email
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedError('The token is expired. Please login again')
            } else {
                // If the token is invalid, it will return an error
                throw new Error('The token is invalid')
            }
        }
    } else {
        // Verify that the email is not already registered
        const existingUser = await User.findOne({ email: data.email }).lean()
        if (existingUser) throw new ConflictError('This email is already registered')

        // Verify that this email doesn't have a sale pending payment
        const pendingSale = await SaleModel.findOne({ email: data.email, status: saleEnum.status.pendingPayment }).lean()
        if (pendingSale) throw new UnauthorizedError('This email already has a pending payment')
    }

    // Veryfy that the product data is correct
    const idProducts = data.products.map(product => product._id)
    const products = await ProductModel.find({ _id: { $in: idProducts } }).lean()

    // Verify that all the products exist
    if (products.length !== idProducts.length) {
        throw new Error('There are products that do not exist')
    }

    // Verify the data for every product
    products.forEach(productDatabase => {
        // Verify that the products have stock
        if (productDatabase.stock === 0) {
            throw new Error('There are products that do not have stock')
        }

        // Find the product in the table of the sale
        const productSale = data.products.find(productData => JSON.stringify(productData._id) === JSON.stringify(productDatabase._id))

        if (productSale) {
        // Verify that the products have enough stock
            if (productSale.quantity > productDatabase.stock) {
                throw new Error('There are products that do not have enough stock')
            }

            // Verify that the products have the correct price
            if (productSale.price !== productDatabase.price) {
                throw new Error('There are products that do not have the correct price')
            }

            // Verify that the products have the correct wholesale price
            if (productSale.wholesalePrice !== productDatabase.wholesalePrice) {
                throw new Error('There are products that do not have the correct wholesale price')
            }

            // Verify that the products have the correct orderMinForWholesale
            if (productSale.orderMinForWholesale !== productDatabase.orderMinForWholesale) {
                throw new Error('The product data is not correct')
            }

            // Verify that the total ammount per product is correct
            const productTotal = parseFloat(productSale.total.toString()).toFixed(2)

            if (productSale.quantity >= productSale.orderMinForWholesale) {
                const productDatabaseTotal = (productSale.quantity * productSale.wholesalePrice).toFixed(2)
                if (productTotal !== productDatabaseTotal) {
                    throw new Error('The total per product is not correct')
                }
            } else {
                const productDatabaseTotal = (productSale.quantity * productSale.price).toFixed(2)
                if (productTotal !== productDatabaseTotal) {
                    throw new Error('The total per product is not correct')
                }
            }
        }
    })

    // Verify that the total ammount is correct
    const total = data.products.reduce((total, product) => {
        return total + product.total
    }, 0)

    if (total.toFixed(2) !== Number(data.total).toFixed(2)) {
        throw new Error('The total ammount is not correct')
    }

    const newSale = new SaleModel(data)
    const saleSaved = await newSale.save()

    const subject = 'You made a Purchase!!'
    const text = 'Thanks for your purchase!!'
    const html = saleRegisterMail(process.env.URL_WATCH_PURCHASE_DETAILS, saleSaved._id.toString())

    try {
        await sendMail(data.email, subject, text, html)
    } catch (error) {
        await SaleModel.findByIdAndDelete(saleSaved._id)
        throw new Error('There was an error sending the email')
    }

    return {
        message: 'Sale added successfully',
        saleId: saleSaved._id.toString()
    }
}

export async function getById(data: saleGetByIdType): Promise<object> {
    const sale = await SaleModel.findOne({ _id: data.id }).populate('products.product').lean()

    if (!sale) {
        throw new Error('The sale does not exist')
    }

    if (sale.user.toString()) {
        if (data.token) {
            const decodedToken = jwt.verify(data.token, config.SECRET)
            const user = await User.findById(decodedToken.sub).lean()

            if (!user) throw new Error('The token is invalid')

            if (user.role !== userEnum.roles.admin) {
                if (sale.user.toString() !== user._id.toString()) {
                    throw new Error('You are not the owner of this purchase')
                }
            }
        } else {
            throw new Error('You are not logged in!!')
        }
    }

    return {
        sale,
        token: data.token
    }
}

export async function userPaymentConfirmation(data: salePaymentConfirmationType): Promise<object> {
    const user = data._user
    const saleId = data.saleId

    const sale = await SaleModel.findById(saleId)

    if (!sale) {
        throw new Error('The sale does not exist')
    }

    if (sale.user.toString() !== user._id.toString()) {
        throw new Error('You are not the owner of this purchase')
    }

    if (sale.status > saleEnum.status.pendingConfirmation && sale.status !== saleEnum.status.canceled) {
        throw new Error('This purchase is not pending payment')
    }

    const newData = {
        paymentMethod: data.paymentMethod,
        paymentReference: data.paymentReference,
        paymentDate: new Date(data.paymentDate),
        rejectionReason: '',
        status: saleEnum.status.pendingConfirmation
    }

    Object.assign(sale, newData)

    const saleSaved = await sale.save()

    return {
        sale: saleSaved
    }
}

export async function adminPaymentConfirmation(data: salePaymentConfirmationType): Promise<object> {
    const user = data._user

    if (user.role !== userEnum.roles.admin) {
        throw new Error('This function is avaliable just for admin users')
    }

    const saleId = data.saleId

    const sale = await SaleModel.findById(saleId)

    if (!sale) {
        throw new Error('The sale does not exist')
    }

    if (sale.status > saleEnum.status.pendingConfirmation && sale.status !== saleEnum.status.canceled) {
        throw new Error('This purchase is not pending confirmation')
    }

    const newData = {
        paymentMethod: data.paymentMethod,
        paymentReference: data.paymentReference,
        paymentDate: new Date(data.paymentDate),
        rejectionReason: '',
        status: saleEnum.status.preparing
    }

    Object.assign(sale, newData)

    const saleSaved = await sale.save()

    return {
        message: 'Payment confirmed successfully',
        sale: saleSaved
    }
}

export async function adminPaymentRejection(data: salePaymentRejectionType): Promise<object> {
    const user = data._user

    if (user.role !== userEnum.roles.admin) {
        throw new Error('This function is avaliable just for admin users')
    }

    const sale = await SaleModel.findById(data.saleId)

    if (!sale) {
        throw new Error('The sale does not exist')
    }

    if (sale.status !== saleEnum.status.pendingConfirmation) {
        throw new Error('This purchase is not pending confirmation')
    }

    const newData = {
        paymentMethod: '',
        paymentReference: '',
        paymentDate: '',
        rejectionReason: data.rejectionReason,
        status: saleEnum.status.pendingPayment
    }

    Object.assign(sale, newData)

    const saleSaved = await sale.save()

    return {
        message: 'Payment rejected successfully',
        sale: saleSaved
    }
}

export async function sentPackage(data: saleSentPackageType): Promise<object> {
    const user = data._user

    if (user.role !== userEnum.roles.admin) {
        throw new Error('This function is avaliable just for admin users')
    }

    const sale = await SaleModel.findById(data.saleId)

    if (!sale) {
        throw new Error('The sale does not exist')
    }

    if (sale.status !== saleEnum.status.preparing) {
        throw new Error('This purchase is not pending confirmation')
    }

    const newData = {
        trackingCode: data.trackingCode,
        status: saleEnum.status.onTheRoad
    }

    Object.assign(sale, newData)

    const saleSaved = await sale.save()

    return {
        message: 'Package sent successfully',
        sale: saleSaved
    }
}

export async function packageReceived(data: salePackageReceivedType): Promise<object> {
    const user = data._user

    const sale = await SaleModel.findById(data.saleId)

    if (!sale) {
        throw new Error('The sale does not exist')
    }

    if (sale.user.toString() !== user._id.toString()) {
        throw new Error('You are not the owner of this purchase')
    }

    if (sale.status !== saleEnum.status.onTheRoad) {
        throw new Error('This purchase is not pending confirmation')
    }

    const newData = {
        rating: data.rating,
        comment: data.comment,
        status: saleEnum.status.received
    }

    Object.assign(sale, newData)

    const saleSaved = await sale.save()

    return {
        message: 'Package received successfully',
        sale: saleSaved
    }
}

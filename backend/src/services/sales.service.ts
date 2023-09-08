import SaleModel from '../Models/sales.model'
import productModel from '../Models/product.model'

import sendMail from '../__helpers/sendEmail'
import { saleDelailsMail } from '../mailTemplates/sales.mails'
import { type saleRegisterType, type saleGetType, type saleChangePaymentStatusType, type saleCancelType } from './_servicesTypes/saleService.types'
import userEnum from '../__helpers/enums/user.enum'
import saleEnum from '../__helpers/enums/sales.enum'

const funcion = (): boolean => {
    return true
}

funcion()

/** Funtion to register an sale
 *
 * @param {object} data._user - user who makes the purchase
 * @param {string} data.sale - sale data
 *
 */
export async function salesRegister(data: saleRegisterType): Promise<object> {
    const user = data._user

    const sale = data.sale
    sale.user = JSON.stringify(user._id)

    // The products are substracted from the inventory if there is enought inventory
    const productsArray = sale.products

    for (const product of productsArray) {
        const productSaved = await productModel.findById(product.product)

        if ((productSaved - product.quantity) < 0) {
            throw new Error('There is not enought stock of ' + product.name)
        }
    }

    throw new Error('holas que tal')

    for (const product of productsArray) {
        await productModel.findByIdAndUpdate(product.product, { stock: { $dec: { total: product.quantity } } })
    }

    // The sale is registered
    const newSale = new SaleModel(data.sale)

    const saleSaved = await newSale.save()

    const subject = 'You made a Purchase!!'
    const text = 'Thanks for your purchase!!'
    const html = saleDelailsMail(process.env.URL_WATCH_PURCHASE_DETAILS, saleSaved._id)

    await sendMail(user.email, subject, text, html)

    return {
        message: 'sale added successfully'
    }
}

/** Funtion to cancel a sale
 *
 * @param {object} data
 * @param {object} data._user - User who requests the sale
 * @param {string} data.id - id of the sale requested
 *
 */
export async function salesCancel(data: saleCancelType): Promise<object> {
    // It is confirmed that the user is the owner of the sale or otherwise the user is an admin

    const user = data._user
    const saleId = data.id
    const sale = await SaleModel.findById(saleId)

    if (sale.user.toString() !== JSON.stringify(user._id)) {
        if (user.role !== userEnum.roles.admin) {
            throw new Error('You are not the owner of this purchase')
        }
    }

    const saleSaved = await SaleModel.findByIdAndUpdate(saleId, { status: saleEnum.status.canceled })

    return {
        sale: saleSaved
    }
}

/** Funtion to get a sale
 *
 * @param {object} data
 * @param {object} data._user - User who requests the sale
 * @param {string} data.id - id of the sale requested
 *
 */
export async function salesGet(data: saleGetType): Promise<object> {
    // It is confirmed that the user is the owner of the sale or otherwise the user is an admin

    const user = data._user

    const sale = await SaleModel.findById(data.id)

    if (sale.user.toString() !== JSON.stringify(user._id)) {
        if (user.role !== userEnum.roles.admin) {
            throw new Error('You are not the owner of this purchase')
        }
    }

    return {
        sale
    }
}

/** Funtion to confirm that the payment was sent
 *
 * @param {object} data -
 * @param {string} data._user - user that makes the request
 * @param {string} data.sale.id - id of the sale to modify
 *
 */
export async function salesSendPayment(data: saleChangePaymentStatusType): Promise<object> {
    const user = data._user
    const saleId = data.sale.id
    const sale = await SaleModel.findById(saleId)

    if ((user.role === userEnum.roles.user) && (sale.status !== saleEnum.status.pendingPayment)) {
        throw new Error('This function is avaliable just for admin users')
    }

    const saleSaved = await SaleModel.findByIdAndUpdate(saleId, { status: saleEnum.status.pendingConfirmation })

    return {
        sale: saleSaved
    }
}

/** Funtion to confirm the payment
 *
 * @param {object} data -
 * @param {string} data._user - user that makes the request
 * @param {string} data.sale_id - id of the sale to modify
 *
 */
export async function salesConfirmPayment(data: saleChangePaymentStatusType): Promise<object> {
    const user = data._user
    const saleId = data.sale.id

    if ((user.role !== userEnum.roles.admin)) {
        throw new Error('This function is avaliable just for admin users')
    }

    const saleSaved = await SaleModel.findByIdAndUpdate(saleId, { status: saleEnum.status.confirmed })

    return {
        sale: saleSaved
    }
}

/** Funtion to confirm that the package was sent
 *
 * @param {object} data -
 * @param {string} data._user - user that makes the request
 * @param {string} data.sale_id - id of the sale to modify
 *
 */
export async function salesConfirmSentPackage(data: saleChangePaymentStatusType): Promise<object> {
    const user = data._user
    const saleId = data.sale.id

    if ((user.role !== userEnum.roles.admin)) {
        throw new Error('This function is avaliable just for admin users')
    }

    const saleSaved = await SaleModel.findByIdAndUpdate(saleId, { status: saleEnum.status.sent })

    return {
        sale: saleSaved
    }
}

/** Funtion to confirm that the packege was received
 *
 * @param {object} data -
 * @param {string} data._user - user that makes the request
 * @param {string} data.sale_id - id of the sale to modify
 *
 */
export async function salesReceivedPackage(data: saleChangePaymentStatusType): Promise<object> {
    const user = data._user
    const saleId = data.sale.id

    if ((user.role !== userEnum.roles.admin)) {
        throw new Error('This function is avaliable just for admin users')
    }

    const saleSaved = await SaleModel.findByIdAndUpdate(saleId, { status: saleEnum.status.received })

    return {
        sale: saleSaved
    }
}

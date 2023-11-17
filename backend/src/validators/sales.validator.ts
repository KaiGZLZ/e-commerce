import { type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { validateObjectId, validateRequiredString, validatePositiveNumber } from './_commonValidations'

export const saleRegisterValidation = [
    validateObjectId('products.*._id', 'Products id'),
    validateObjectId('products.*.product', 'Products product'),
    validateRequiredString('products.*.name', 'Products name'),
    validatePositiveNumber('products.*.price', 'Products price'),
    validatePositiveNumber('products.*.wholesalePrice', 'Products wholesale price'),
    validatePositiveNumber('products.*.orderMinForWholesale', 'Products ninimum quantity for wholesale'),
    validatePositiveNumber('quantity.*.quantity', 'Products quantity'),
    validatePositiveNumber('products.*.total', 'Products total'),
    validatePositiveNumber('total', 'Total'),
    validatePositiveNumber('totalQuantity', 'Total quantity'),

    (req: Request, res: Response, next: NextFunction): Response | null => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(422).send(errors.array()[0].msg) }
        next()
        return null
    }
]

import { type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { validateObjectId, validateRequiredString, validatePositiveNumber } from './_commonValidations'

export const salesRegisterValidation = [
    validateObjectId('sale.products.*.product'),
    validateRequiredString('sale.products.*.name', 'Products name'),
    validatePositiveNumber('sale.products.*.price', 'Products price'),
    validatePositiveNumber('sale.products.*.wholesalePrice', 'Products wholesale price'),
    validatePositiveNumber('sale.products.*.orderMinForWholesale', 'Products ninimum quantity for wholesale'),
    validatePositiveNumber('sale.quantity.*.quantity', 'Products quantity'),
    validatePositiveNumber('sale.products.*.exchangeRate', 'Products exchange rate'),
    validatePositiveNumber('sale.products.*.total', 'Products total'),

    (req: Request, res: Response, next: NextFunction): Response | null => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(422).send(errors.array()[0].msg) }
        next()
        return null
    }
]

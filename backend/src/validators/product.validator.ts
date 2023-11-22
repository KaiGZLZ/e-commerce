import { type Request, type Response, type NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { validateRequiredString, validatePositiveNumber, validateObjectId } from './_commonValidations'

export const productRegisterValidation = [
    validateRequiredString('name', 'products name'),
    validatePositiveNumber('price', 'products price'),
    validateRequiredString('description', 'products description'),
    validateRequiredString('category', 'products category'),
    // validateRequiredString('subCategory', 'products sub-category'),
    body('tags')
        .isArray({})
        .withMessage('The tags must be an array')
        .bail(),
    body('wholesalePrice')
        .trim()
        .custom((value, { req }) => {
            return !((value && !req.body.orderMinForWholesale) || (!value && req.body.orderMinForWholesale))
        })
        .withMessage('The wholesale price and the minimum order for the wholesale must be set both or neither')
        .bail()
        .if((value) => value)
        .isNumeric()
        .withMessage('The wholesale price must be numeric')
        .bail()
        .custom((value) => {
            return Number(value) > 0
        })
        .withMessage('The wholesale price must be greater or equal to zero')
        .bail()
        .custom((value, { req }) => {
            return Number(value) < req.body.price
        })
        .withMessage('The wholesale price must be less than the price')
        .bail(),
    body('orderMinForWholesale')
        .trim()
        .custom((value, { req }) => {
            return !((value && !req.body.orderMinForWholesale) || (!value && req.body.orderMinForWholesale))
        })
        .withMessage('The wholesale price and the minimum order for the wholesale must be set both or neither')
        .bail()
        .if((value) => value)
        .isNumeric()
        .withMessage('The minimum order for the wholesale price must be numeric')
        .bail()
        .custom((value) => {
            return Number(value) > 0
        })
        .withMessage('The minimum order for the wholesale must be greater or equal to zero')
        .bail(),
    validatePositiveNumber('stock', 'products stock'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.array()[0].msg)
        } else {
            next()
            return undefined
        }
    }
]

export const productDeleteValidation = [
    validateObjectId('data.id', 'products id'),

    (req: Request, res: Response): Response | undefined => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(422).send(errors.array()[0].msg) } else return undefined
    }
]

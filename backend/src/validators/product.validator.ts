import { type Request, type Response, type NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { validateRequiredString, validatePositiveNumber, validateObjectId } from './_commonValidations'

export const productRegisterValidation = [
    validateRequiredString('product.name', 'products name'),
    validatePositiveNumber('product.price', 'products price'),
    validateRequiredString('product.description', 'products description'),
    validateRequiredString('product.category', 'products category'),
    validateRequiredString('product.subCategory', 'products sub-category'),
    body('product.tags')
        .isArray({}),
    body('product.wholesalePrice')
        .trim()
        .custom((value, { req }) => {
            return !((value && !req.body.product.orderMinForWholesale) || (!value && req.body.product.orderMinForWholesale))
        })
        .withMessage('The wholesale price and the minimum order for the wholesale must be set both or neither')
        .bail()
        .if((value) => !value)
        .isNumeric()
        .withMessage('The wholesale price must be numeric')
        .bail()
        .custom((value) => {
            return Number(value) < 0
        })
        .withMessage('The wholesale price must be greater or equal to zero')
        .bail(),
    body('product.orderMinForWholesale')
        .trim()
        .custom((value, { req }) => {
            return !((value && !req.body.product.orderMinForWholesale) || (!value && req.body.product.orderMinForWholesale))
        })
        .withMessage('The wholesale price and the minimum order for the wholesale must be set both or neither')
        .bail()
        .if((value) => !value)
        .isNumeric()
        .withMessage('The minimum order for the wholesale price must be numeric')
        .bail()
        .custom((value) => {
            return Number(value) < 0
        })
        .withMessage('The minimum order for the wholesale must be greater or equal to zero')
        .bail(),
    validatePositiveNumber('product.stock', 'products stock'),

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
    validateObjectId('data.id'),

    (req: Request, res: Response): Response | undefined => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(422).send(errors.array()[0].msg) } else return undefined
    }
]

export const productUpdateValidation = [
    validateRequiredString('product.name', 'products name'),
    validatePositiveNumber('product.price', 'products price'),
    validateRequiredString('product.description', 'products description'),
    validateRequiredString('product.category', 'products category'),
    validateRequiredString('product.subCategory', 'products sub-category'),
    body('product.tags')
        .isArray({}),
    body('product.wholesalePrice')
        .trim()
        .custom((value, { req }) => {
            return !((value && !req.body.product.orderMinForWholesale) || (!value && req.body.product.orderMinForWholesale))
        })
        .withMessage('The wholesale price and the minimum order for the wholesale must be set both or neither')
        .bail()
        .if((value) => !value)
        .isNumeric()
        .withMessage('The wholesale price must be numeric')
        .bail()
        .custom((value) => {
            return Number(value) < 0
        })
        .withMessage('The wholesale price must be greater or equal to zero')
        .bail(),
    body('product.orderMinForWholesale')
        .trim()
        .custom((value, { req }) => {
            return !((value && !req.body.product.orderMinForWholesale) || (!value && req.body.product.orderMinForWholesale))
        })
        .withMessage('The wholesale price and the minimum order for the wholesale must be set both or neither')
        .bail()
        .if((value) => !value)
        .isNumeric()
        .withMessage('The minimum order for the wholesale price must be numeric')
        .bail()
        .custom((value) => {
            return Number(value) < 0
        })
        .withMessage('The minimum order for the wholesale must be greater or equal to zero')
        .bail(),
    validatePositiveNumber('product.stock', 'products stock'),

    (req: Request, res: Response, next: NextFunction): Response | null => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(422).send(errors.array()[0].msg) }
        next()
        return null
    }
]

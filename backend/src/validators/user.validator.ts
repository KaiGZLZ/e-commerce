import { type Request, type Response, type NextFunction } from 'express'
import { check, body, validationResult } from 'express-validator'
import { validateUsername, validatePassword, validateEmail } from './_commonValidations'

export const userRegisterValidation = [
    validateUsername('username'),
    check('firstname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User firstname can not be empty!')
        .bail(),
    check('lastname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User lastname can not be empty!')
        .bail(),
    validateEmail('email'),
    validatePassword('password', 'Password'),
    validatePassword('passwordConfirmation', 'Password confirmation')
        .custom((value, { req }) => {
            return value === req.body.password
        })
        .withMessage('The password confirmation does not match with the password!')
        .bail(),

    (req: Request, res: Response, next: NextFunction): Response | undefined => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(422).send(errors.array()[0].msg) }
        next()
        return undefined
    }
]

export const userDeleteValidation = [
    body('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('The password cannot be empty!')
        .bail()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters!')
        .bail(),

    (req: Request, res: Response, next: NextFunction): Response | undefined => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).send(errors.array()[0].msg)
        next()
        return undefined
    }
]

export const userLoginValidation = [
    validateUsername('username'),
    validatePassword('password', 'Password '),

    (req: Request, res: Response, next: NextFunction): Response | undefined => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).send(errors.array()[0].msg)
        next()
        return undefined
    }
]

export const userAuthenticateValidation = [
    body('token')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Invalid activation token')
        .bail(),

    (req: Request, res: Response, next: NextFunction): Response | undefined => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).send(errors.array()[0].msg)
        next()
        return undefined
    }
]

export const userForgotenPasswordValidation = [

    validateEmail('email'),

    (req: Request, res: Response, next: NextFunction): Response | undefined => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).send(errors.array()[0].msg)
        next()
        return undefined
    }
]

export const userChangePasswordValidation = [

    validatePassword('data.password', 'Password'),
    validatePassword('data.passwordConfirmation', 'Password confirmation')
        .custom((value, { req }) => {
            return value === req.body.data.password
        })
        .withMessage('The password confirmation does not match with the password!')
        .bail(),
    body('data.token')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Invalid activation token')
        .bail(),

    (req: Request, res: Response, next: NextFunction): Response | undefined => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).send(errors.array()[0].msg)
        next()
        return undefined
    }
]

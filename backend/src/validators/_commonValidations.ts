import { type ValidationChain, check } from 'express-validator'

/**
 *
 * @param {string} path - The name of the path that is going to be checked
 * @returns
 */
export function validateUsername(path: string): ValidationChain {
    return check(path)
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User username can not be empty!')
        .bail()
        .custom((value) => {
            return !value.includes(' ')
        })
        .withMessage('Username can not have white spaces!')
        .bail()
}

/**
 *
 * @param {string} path - The name of the path that is going to be checked
 * @returns
 */
export function validatePassword(path: string, fieldName: string): ValidationChain {
    return check(path)
        .trim()
        .not()
        .isEmpty()
        .withMessage(`The ${fieldName} cannot be empty!`)
        .bail()
        .isLength({ min: 8 })
        .withMessage(`The ${fieldName} must be at least 8 characters!`)
        .bail()
        .custom((value) => {
            return !value.includes(' ')
        })
        .withMessage(`The ${fieldName} can not have white spaces!`)
        .bail()
}

/**
 *
 * @param {string} path - The name of the path that is going to be checked
 * @returns
 */
export function validateEmail(path: string): ValidationChain {
    return check(path)
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User Email can not be empty!')
        .bail()
        .custom((value) => {
            return !value.includes(' ')
        })
        .withMessage('Email can´tt have white spaces!')
        .bail()
        .isEmail()
        .withMessage('The word doesn´t correspond with an email')
        .bail()
}

/**
 *
 * @param {string} path - The name of the path that is going to be checked. Ej: 'user.firstname'
 * @param {string} fieldName - The name of the field that is going to be checked. Ej: 'firstname of the user'
 * @returns
 */
export function validateRequiredString(path: string, fieldName: string): ValidationChain {
    return check(path)
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage(`The ${fieldName} is required`)
        .bail()
}

/**
 *
 * @param {string} path - The name of the path that is going to be checked. Ej: 'user.firstname'
 * @param {string} fieldName - The name of the field that is going to be checked. Ej: 'firstname of the user'
 * @returns
 */
export function validateNumber(path: string, fieldName: string): ValidationChain {
    return check(path)
        .trim()
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage(`The ${fieldName} must be numeric`)
        .bail()
}

/**
 *
 * @param {string} path - The name of the path that is going to be checked. Ej: 'user.firstname'
 * @param {string} fieldName - The name of the field that is going to be checked. Ej: 'firstname of the user'
 * @returns
 */
export function validatePositiveNumber(path: string, fieldName: string): ValidationChain {
    return check(path)
        .trim()
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage(`The ${fieldName} must be numeric`)
        .bail()
        .custom((value) => {
            return Number(value) > 0
        })
        .withMessage(`The ${fieldName} must be greater or equal to zero`)
        .bail()
}

export function validateObjectId(path: string): ValidationChain {
    return check(path)
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User ObjectId can not be empty!')
        .bail()
        .custom((value) => {
            return !value.includes(' ')
        })
        .withMessage('ObjectId can not have white spaces!')
        .bail()
}

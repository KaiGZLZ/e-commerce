
import { check } from "express-validator"


/**
 * 
 * @param {string} path - The name of the path that is going to be checked 
 * @returns 
 */
export function validateUsername (path: string){ 
    return check(path)
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User username can not be empty!')
        .bail()
        .custom((value) => {
            return !value.includes(' ');
        })
        .withMessage('Username can not have white spaces!')
        .bail()
}

    
    
/**
 * 
 * @param {string} path - The name of the path that is going to be checked 
 * @returns 
 */
export function validatePassword(path: string){
    return check(path)
        .trim()
        .not()
        .isEmpty()
        .withMessage('The password cannot be empty!')
        .bail()
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters!')
        .bail()
        .custom((value) => {
            return !value.includes(' ');
        })
        .withMessage('Username can not have white spaces!')
        .bail()
}


/**
 * 
 * @param {string} path - The name of the path that is going to be checked 
 * @returns 
 */
export function validateEmail(path: string){
    return check(path)
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User Email can not be empty!')
        .bail()
        .custom((value) => {
            return !value.includes(' ');
        })
        .withMessage('Email can´tt have white spaces!')
        .bail()
        .isEmail()
        .withMessage('The word doesn´t correspond with an email')
        .bail()
}

  
import { Request, Response, NextFunction } from 'express';
import {check, body, validationResult } from "express-validator";
import { validateUsername, validatePassword, validateEmail,  } from "./commonValidations";


export const userRegisterValidation = [
    validateUsername('user.username'),
    check('user.firstname')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('User firstname can not be empty!')
      .bail()
    ,
    check('user.lastname')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('User lastname can not be empty!')
      .bail()
    ,
    validatePassword('user.password'),
    validatePassword('user.passwordConfirmation')
      .custom((value, { req }) => {
        return value === req.body.user.password;
      })
      .withMessage('The password confirmation does not match with the password!')
      .bail(),
        
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({message: errors.array()[0].msg});
      return next();
    },
]
      
export const userDeleteValidation = [
    body('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('The password cannot be empty!')
        .bail()
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters!')
        .bail(),
        
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty())  return res.status(422).json({message: errors.array()[0].msg});
        
      return next();
    },
]

export const userLoginValidation = [
    validateUsername('userRequested.username'),
    validatePassword('userRequested.password'),
    
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty())  return res.status(422).json({message: errors.array()[0].msg});
        
      return next();
    },
]
    
export const userAuthenticateValidation = [
  body('token')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid activation token')
      .bail(),
      
    (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())  return res.status(422).json({message: errors.array()[0].msg});
      
    return next();
  },
]

export const userForgotenPasswordValidation = [

  validateEmail('data.email'),
      
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty())  return res.status(422).json({message: errors.array()[0].msg});
        
    return next();
  },
]

export const userChangePasswordValidation = [

  validatePassword('data.password'),
  validatePassword('data.passwordConfirmation')
    .custom((value, { req }) => {
      return value === req.body.data.password;
    })
    .withMessage('The password confirmation does not match with the password!')
    .bail(),
  body('data.token')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid activation token')
    .bail(),
      
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty())  return res.status(422).json({message: errors.array()[0].msg});
        
    return next();
  },
]

  
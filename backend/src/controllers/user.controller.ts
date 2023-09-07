
import express from 'express'
import { Request, Response, NextFunction } from 'express'

import * as userService from '../services/user.service'
import { userRegisterValidation, userDeleteValidation, userLoginValidation, userAuthenticateValidation, userForgotenPasswordValidation, userChangePasswordValidation } from '../validators/user.validator';


const router = express.Router();

// routes
router.post('/register', userRegisterValidation, userRegister);
router.delete('/delete', userDeleteValidation, userDelete);
router.post('/login', userLoginValidation, userLogin);
router.post('/authenticate', userAuthenticateValidation, userAuthenticate);
router.post('/forgotten-password', userForgotenPasswordValidation, userForgotenPassword);
router.post('/change-password', userChangePasswordValidation, userChangePassword);

module.exports = router;


// Register a new user 
function userRegister(req: Request, res: Response, next: NextFunction): void {
    
    userService.userRegister(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

// Delete an user
function userDelete(req: Request, res: Response, next: NextFunction): void {
    userService.userDelete(req.body)
        .then(data =>res.json({data}))
        .catch(err => next(err));
}

// Login a new user
function userLogin(req: Request, res: Response, next: NextFunction): void {
    userService.userLogin(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

// Authenticate a new user
function userAuthenticate(req: Request, res: Response, next: NextFunction): void {
    userService.userAuthenticate(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

// Funtion to send an recovery email if the password was forgotten
function userForgotenPassword(req: Request, res: Response, next: NextFunction): void {
    userService.sendRecoveryEmail(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

// Function to change the password after the email was sent
function userChangePassword(req: Request, res: Response, next: NextFunction): void {
    userService.userChangePassword(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}
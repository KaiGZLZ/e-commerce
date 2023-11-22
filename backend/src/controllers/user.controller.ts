import express, { type Request, type Response, type NextFunction } from 'express'

import * as userService from '../services/user.service'
import { userRegisterValidation, userDeleteValidation, userLoginValidation, userAuthenticateValidation, userForgotenPasswordValidation, userChangePasswordValidation } from '../validators/user.validator'

const router = express.Router()

// routes
router.post('/register', userRegisterValidation, userRegister)
router.get('/get-user-by-username/:username', getUserByUsername)
router.patch('/update', userUpdate)
router.delete('/delete', userDeleteValidation, userDelete)
router.post('/login', userLoginValidation, userLogin)
router.post('/authenticate', userAuthenticateValidation, userAuthenticate)
router.post('/forgotten-password', userForgotenPasswordValidation, userForgotenPassword)
router.post('/change-password', userChangePasswordValidation, userChangePassword)

module.exports = router

// Register a new user
function userRegister(req: Request, res: Response, next: NextFunction): void {
    userService.userRegister(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => { next(err) })
}

// Get an user by username
function getUserByUsername(req: Request, res: Response, next: NextFunction): void {
    const params = {
        username: req.params.username
    }

    userService.getUserByUsername({ ...req.body, ...params })
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

// Update an user
function userUpdate(req: Request, res: Response, next: NextFunction): void {
    userService.userUpdate(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

// Delete an user
function userDelete(req: Request, res: Response, next: NextFunction): void {
    userService.userDelete(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Login a new user
function userLogin(req: Request, res: Response, next: NextFunction): void {
    userService.userLogin(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

// Authenticate a new user
function userAuthenticate(req: Request, res: Response, next: NextFunction): void {
    userService.userAuthenticate(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

// Funtion to send an recovery email if the password was forgotten
function userForgotenPassword(req: Request, res: Response, next: NextFunction): void {
    userService.sendRecoveryEmail(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

// Function to change the password after the email was sent
function userChangePassword(req: Request, res: Response, next: NextFunction): void {
    userService.userChangePassword(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

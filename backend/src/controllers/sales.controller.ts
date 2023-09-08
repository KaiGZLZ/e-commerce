import express, { type Request, type Response, type NextFunction } from 'express'

import * as salesService from '../services/sales.service'
import { salesRegisterValidation } from '../validators/sales.validator'

const router = express.Router()

// routes
router.post('/register', salesRegisterValidation, salesRegister)
router.get('/:id', salesGet)
router.post('/send-payment', salesSendPayment)
router.post('/confirm-payment', salesConfirmPayment)
router.post('/confirm-sent-package', salesConfirmSentPackage)
router.post('/confirm-received-package', salesReceivedPackage)

module.exports = router

// Register a new sale
function salesRegister(req: Request, res: Response, next: NextFunction): void {
    salesService.salesRegister(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

// Delete an sale
function salesGet(req: Request, res: Response, next: NextFunction): void {
    salesService.salesGet(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Login a new sale
function salesSendPayment(req: Request, res: Response, next: NextFunction): void {
    salesService.salesSendPayment(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

// Authenticate a new sale
function salesConfirmPayment(req: Request, res: Response, next: NextFunction): void {
    salesService.salesConfirmPayment(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

// Funtion to send an recovery email if the password was forgotten
function salesConfirmSentPackage(req: Request, res: Response, next: NextFunction): void {
    salesService.salesConfirmSentPackage(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

// Function to change the password after the email was sent
function salesReceivedPackage(req: Request, res: Response, next: NextFunction): void {
    salesService.salesReceivedPackage(req.body)
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

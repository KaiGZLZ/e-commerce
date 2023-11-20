import express, { type Request, type Response, type NextFunction } from 'express'

import * as saleService from '../services/sales.service'
import { saleRegisterValidation } from '../validators/sales.validator'

const router = express.Router()

// routes
router.post('/register', saleRegisterValidation, saleRegister)
router.get('/get-by-id/:id', getById)
router.post('/user-payment-confirmation', userPaymentConfirmation)
router.post('/admin-payment-confirmation', adminPaymentConfirmation)
router.post('/admin-payment-rejection', adminPaymentRejection)
router.post('/sent-package', sentPackage)
router.post('/package-received', packageReceived)

module.exports = router

// Register a new sale
function saleRegister(req: Request, res: Response, next: NextFunction): void {
    saleService.saleRegister(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => {
            console.log(err)
            next(err)
        })
}

// Get a sale
function getById(req: Request, res: Response, next: NextFunction): void {
    // Review to see if the header has a Bearer token
    const token = req.headers.authorization?.split(' ')[1] ?? ''

    const data = {
        token,
        id: req.params.id
    }

    saleService.getById(data)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// User payment confirmation
function userPaymentConfirmation(req: Request, res: Response, next: NextFunction): void {
    saleService.userPaymentConfirmation(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Admin payment confirmation
function adminPaymentConfirmation(req: Request, res: Response, next: NextFunction): void {
    saleService.adminPaymentConfirmation(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Admin payment rejection
function adminPaymentRejection(req: Request, res: Response, next: NextFunction): void {
    saleService.adminPaymentRejection(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Sent package
function sentPackage(req: Request, res: Response, next: NextFunction): void {
    saleService.sentPackage(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Package received
function packageReceived(req: Request, res: Response, next: NextFunction): void {
    saleService.packageReceived(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

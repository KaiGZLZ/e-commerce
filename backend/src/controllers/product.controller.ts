import express, { type Request, type Response, type NextFunction } from 'express'

import * as productService from '../services/product.service'
import { productRegisterValidation, productDeleteValidation, productUpdateValidation } from '../validators/product.validator'

const router = express.Router()

// routes
router.post('/register', productRegisterValidation, productRegister)
router.delete('/delete', productDeleteValidation, productDelete)
router.patch('/update', productUpdateValidation, productUpdate)
router.get('/product/:id', productGet)

module.exports = router

// Register a new product
function productRegister(req: Request, res: Response, next: NextFunction): void {
    productService.productRegister(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => { next(err) })
}

// Delete an product
function productDelete(req: Request, res: Response, next: NextFunction): void {
    productService.productDelete(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Delete an product
function productUpdate(req: Request, res: Response, next: NextFunction): void {
    productService.productUpdate(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Get a product
function productGet(req: Request, res: Response, next: NextFunction): void {
    productService.productGet(req.params.id)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

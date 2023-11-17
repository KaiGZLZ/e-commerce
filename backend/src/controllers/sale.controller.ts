import express, { type Request, type Response, type NextFunction } from 'express'

import * as saleService from '../services/sales.service'
import { saleRegisterValidation } from '../validators/sales.validator'

const router = express.Router()

// routes
router.post('/register', saleRegisterValidation, saleRegister)
router.get('/get-by-id/:id', getById)
/* router.delete('/delete', saleDeleteValidation, saleDelete)
 router.patch('/update', saleUpdateValidation, saleUpdate)
router.get('/sale/:id', saleGet)
router.get('/table', saleTable) */

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

// Delete an sale
/* function saleDelete(req: Request, res: Response, next: NextFunction): void {
    saleService.saleDelete(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Delete an sale
function saleUpdate(req: Request, res: Response, next: NextFunction): void {
    saleService.saleUpdate(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Get a sale
function saleTable(req: Request, res: Response, next: NextFunction): void {
    saleService.saleTable(req.query)
        .then(data => res.json({ data }))
        .catch(err => { console.log(err); next(err) })
} */

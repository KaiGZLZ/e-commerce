import express, { type Request, type Response, type NextFunction } from 'express'

import * as categoryService from '../services/category.service'
import { categoryRegisterValidation } from '../validators/category.validator'

const router = express.Router()

router.post('/register', categoryRegisterValidation, categoryRegister)
router.delete('/delete', categoryDelete)
router.patch('/update', categoryUpdate)
router.get('/category/:id', categoryGet)
router.get('/get-all', getAll)

module.exports = router

// Register a new category
function categoryRegister(req: Request, res: Response, next: NextFunction): void {
    categoryService.categoryRegister(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => { next(err) })
}

// Get all categories
function getAll(_req: Request, res: Response, next: NextFunction): void {
    categoryService.getAll()
        .then(data => res.json(data))
        .catch(err => { next(err) })
}

/** ******************************************************************************** */

// Delete an category
function categoryDelete(req: Request, res: Response, next: NextFunction): void {
    categoryService.categoryDelete(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Delete an category
function categoryUpdate(req: Request, res: Response, next: NextFunction): void {
    categoryService.categoryUpdate(req.body)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

// Get a category
function categoryGet(req: Request, res: Response, next: NextFunction): void {
    categoryService.categoryGet(req.params.id)
        .then(data => res.json({ data }))
        .catch(err => { next(err) })
}

import { type Request, type Response, type NextFunction } from 'express'

// Error management
export default async function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): Promise<Response> {
    if (typeof (err) === 'string') {
        // Custom application error
        return res.status(400).send(err)
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        console.log('ValidationError')
        return res.status(400).send({
            message: err.message,
            name: err.name,
            status: 400,
            data: {}
        })
    }

    if (err.name === 'UnauthorizedError') {
        // jwt error de autentication
        // Invalid Token
        return res.status(401).send({
            message: err.message,
            name: err.name,
            status: 401,
            data: {}
        })
    }

    if (err.name === 'CastError') {
        console.log('CastError')
        return res.status(422).send(err.message)
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).send(err.message)
    }

    if (err.name === 'MongoServerError') {
        // If the error is a duplicate key error
        if (err.code === 11000) {
            const key = Object.keys(err.keyValue)[0]
            return res.status(409).send('Duplicate field value entered. The ' + key + ' ' + err.keyValue[key] + ' already exists')
        }
    }

    if (err.name === 'ConflictError') {
        return res.status(409).send(err.message)
    }

    // default 500 server error
    return res.status(500).send({
        message: err.message,
        name: err.name,
        status: 500,
        data: {}
    })
}

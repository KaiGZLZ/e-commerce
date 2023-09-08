import { type Request, type Response, type NextFunction } from 'express'

// Error management
export default async function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): Promise<Response> {
    if (typeof (err) === 'string') {
        // Custom application error
        return res.status(400).send(err)
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        console.log('ValidationError')
        return res.status(400).send(err.message)
    }

    if (err.name === 'UnauthorizedError') {
        // jwt error de autentication
        // Invalid Token
        return res.status(401).send(err.message)
    }

    if (err.name === 'CastError') {
        return res.status(422).send(err.message)
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).send(err.message)
    }

    // default 500 server error
    return res.status(500).send(err.message)
}

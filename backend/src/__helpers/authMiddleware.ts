import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import config from '../config'
import User from '../Models/user.model'

const exceptions: Array<string | RegExp> = [
    // Public routes that do not require authentication
    '/user/login',
    '/user/register',
    /^\/user\/authenticate/,    // authentication route
    /^\/user\/forgotten-password/,     // forgoten-password route
    /^\/user\/change-password/,     // forgoten-password route
]

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {

    // The exceptions paths are evaluated
    const avoidAutentication = exceptions.some((route) => {
        
        // if the exception is a regular expression
        if (typeof route === "object"){
            return route.test(req.path)
        }
        if (typeof route === "string"){
            return route === req.path
        }

        return false;
    })

    if (avoidAutentication) next();

    else{
        // Obtener el token JWT de la solicitud
        const token = req.headers['authorization']?.split(' ')[1] ?? '';

        // Validar el token JWT
        try {
            const decodedToken = jwt.verify(token, config.SECRET);

            const _user = await User.findById(decodedToken.sub).lean();
         
            if (_user) {

                Object.assign(req.body, {_user}); 
                next();
            }
            else throw('The token is invalid')
            
        } catch (error: any) {

            if (error.name === "TokenExpiredError"){
                error.message = "The token is expired. Please login again";
            }
            // If the token is invalid, it will return an error
            next(error)
        }
    }
};

export default authMiddleware;

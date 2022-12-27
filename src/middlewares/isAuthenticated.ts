import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface PayLoad {
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {

    //receber o token
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")

    try {
        //validar esse token.
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;

        //to recover token id and put inside a variable user_id in req.    
        req.user_id = sub;

       return next();

    } catch (err) {
        return res.status(401).end();
    }

}

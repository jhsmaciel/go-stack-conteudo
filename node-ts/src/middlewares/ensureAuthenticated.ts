import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from '../config';

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // Validar o toke JWT
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Error('JWT token is missing!');
    }

    const [type, token] = authHeader.split(' ');
    try {
        const { sub } = verify(token, config.jwt.secret) as TokenPayload;

        response.locals.user = {
            id: sub
        };

        return next()
    } catch {
        throw new Error('Invalida JWT token!')
    }
}

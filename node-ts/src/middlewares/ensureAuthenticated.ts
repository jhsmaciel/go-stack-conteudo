import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    // Validar o toke JWT
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing.', 403);
    }

    const [type, token] = authHeader.split(' ');
    try {
        const { sub } = verify(token, config.jwt.secret) as TokenPayload;

        response.locals.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token.', 403);
    }
}

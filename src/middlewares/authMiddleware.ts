import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: string;
    exp: number;
}

function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, 'Nyh4ZSR2XUWyt8yXjJt3');
        const { id } = data as TokenPayload;
        request.userId = id;
        next();
    } catch {
        return response.sendStatus(401);
    }
}

export default authMiddleware;
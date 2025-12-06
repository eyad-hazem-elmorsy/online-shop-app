import { NextFunction, Request, Response } from 'express';
import BaseError from '../errors/BaseError';
import InternalServerError from '../errors/InternalServerError';

export default <T>(
    middleware: (req: Request, res: Response, next: NextFunction) => Promise<T>,
    redirectPath?: string
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        middleware(req, res, next).catch(err => {
            req.redirectTo = redirectPath;
            return next(err);
        });
    };
};

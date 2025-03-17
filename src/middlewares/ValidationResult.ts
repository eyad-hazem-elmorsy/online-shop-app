import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ValidationError from '../errors/ValidationError';

export default (redirectPath?: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!validationResult(req).isEmpty()) {
            const errors = ValidationError.mapErrors(
                validationResult(req).array()
            );
            req.flash('validationErrors', errors);
            res.redirect(req.body.redirectTo || redirectPath || '/');
            return;
        }
        next();
    };
};

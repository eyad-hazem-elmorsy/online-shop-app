import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/BaseError";
import InternalServerError from "../errors/InternalServerError";

export default <T> (
    middleware: (req: Request, res: Response, next: NextFunction) => Promise<T>, 
    redirectPath: string
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        middleware(req, res, next)
        .catch((err) => {
            if (err instanceof BaseError)
                req.flash('authError', err);
            else
                req.flash('authError', new InternalServerError());
            res.redirect(redirectPath);
        });
    }
}
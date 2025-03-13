import { NextFunction, Request, Response } from 'express';

export default {
    isAuth: (req: Request, res: Response, next: NextFunction) => {
        if (req.session.user) next();
        else res.redirect('/login');
    },

    notAuth: (req: Request, res: Response, next: NextFunction) => {
        if (!req.session.user) next();
        else res.redirect('/');
    }
};

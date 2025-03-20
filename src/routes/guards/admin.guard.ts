import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user!.isAdmin) next();
    else res.send('Not Authorized');
};

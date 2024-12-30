import { Request, Response } from 'express';

export default {
    // Requests' handlers
    getSignup: (req: Request, res: Response) => {
        res.render('signup');
    },

    postSignup: (req: Request, res: Response) => {

    },

    getLogin: (req: Request, res: Response) => {
        res.render('login');
    }
}
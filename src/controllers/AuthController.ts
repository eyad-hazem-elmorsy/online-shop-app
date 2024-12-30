import { Request, Response } from 'express';
import { createNewUser } from '../models/auth';

export default {
    // Requests' handlers
    getSignup: (req: Request, res: Response) => {
        res.render('signup');
    },

    postSignup: (req: Request, res: Response) => {
        createNewUser(req.body.username, req.body.email, req.body.password)
        .then(() => res.redirect('/login'))
        .catch((err) => res.redirect('/signup'));
    },

    getLogin: (req: Request, res: Response) => {
        res.render('login');
    }
}
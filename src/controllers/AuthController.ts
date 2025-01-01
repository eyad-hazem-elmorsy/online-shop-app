import { Request, Response } from 'express';
import { createNewUser, login } from '../models/auth';

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
    },

    postLogin: (req: Request, res: Response) => {
        login(req.body.email, req.body.password)
        .then((user) => {
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => res.redirect('/login'));
    },

    Logout: (req: Request, res: Response) => {
        req.session.destroy(() => res.redirect('/'));
    }
}
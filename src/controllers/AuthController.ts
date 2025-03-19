import { Request, Response } from 'express';
import { createNewUser, login } from '../models/auth';
import MiddlewareWrapper from '../Utils/MiddlewareWrapper';

export default {
    // Requests' handlers
    getSignup: (req: Request, res: Response) => {
        res.render('signup', {
            authError: req.flash('Error')[0],
            validationErrors: req.flash('validationErrors')
        });
    },

    postSignup: MiddlewareWrapper(async (req: Request, res: Response) => {
        await createNewUser(
            req.body.username,
            req.body.email,
            req.body.password
        );
        return res.redirect('/login');
    }, '/signup'),

    getLogin: (req: Request, res: Response) => {
        res.render('login', {
            authError: req.flash('Error')[0],
            validationErrors: req.flash('validationErrors')
        });
    },

    postLogin: MiddlewareWrapper(async (req: Request, res: Response) => {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');
    }, '/login'),

    Logout: (req: Request, res: Response) => {
        req.session.destroy(() => res.redirect('/'));
    }
};

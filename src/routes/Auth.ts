import express, { Router } from 'express';
import authController from '../controllers/AuthController';
import { check } from 'express-validator';
import { validationResult } from '../middlewares';

const router: Router = express.Router();

// Signup middlewares
router.get('/signup', authController.getSignup);
router.post('/signup', 
    check('username').isLength({ min: 3 }).withMessage('Length of username must be at least 3'), 
    check('email').isEmail().withMessage('Invalid email format'), 
    check('password').isLength({ min: 7 }).withMessage('Length of username must be at least 7'), 
    check('confirmPassword').custom((value, { req }) => {
        if (value === req.body.password) return true;
        else throw new Error('Passwords are not equal');
    }), validationResult('/signup'), 
    authController.postSignup
);

// Login middlewares
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Logout middlewares
router.all('/logout', authController.Logout);

export default router;
import { check } from 'express-validator';
import { validationResult } from '.';

export default {
    signup: [
        check('username')
            .notEmpty()
            .withMessage('Username is required')
            .isLength({ min: 3 })
            .withMessage('Length of username must be at least 3'),
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format'),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 7 })
            .withMessage('Length of username must be at least 7'),
        check('confirmPassword').custom((value, { req }) => {
            if (value === req.body.password) return true;
            else throw new Error('Passwords are not equal');
        }),
        validationResult('/signup')
    ],

    login: [
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format'),
        check('password').notEmpty().withMessage('Password is required'),
        validationResult('/login')
    ],

    addCartItem: [
        check('amount')
            .not()
            .isEmpty()
            .withMessage('Amount is required')
            .isInt({ min: 1 })
            .withMessage('Amount must be at least 1'),
        validationResult()
    ]
};

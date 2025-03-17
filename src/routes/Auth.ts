import express, { Router } from 'express';
import authController from '../controllers/AuthController';
import { expressValidators } from '../middlewares';
import authGuard from './guards/auth.guard';

const router: Router = express.Router();

// Signup middlewares
router.get('/signup', authGuard.notAuth, authController.getSignup);
router.post(
    '/signup',
    authGuard.notAuth,
    expressValidators.signup,
    authController.postSignup
);

// Login middlewares
router.get('/login', authGuard.notAuth, authController.getLogin);
router.post(
    '/login',
    authGuard.notAuth,
    expressValidators.login,
    authController.postLogin
);

// Logout middlewares
router.all('/logout', authController.Logout);

export default router;

import express, { Router } from 'express';
import authController from '../controllers/AuthController';
import { expressValidators } from '../middlewares';

const router: Router = express.Router();

// Signup middlewares
router.get('/signup', authController.getSignup);
router.post('/signup', expressValidators.signup, authController.postSignup);

// Login middlewares
router.get('/login', authController.getLogin);
router.post('/login', expressValidators.login, authController.postLogin);

// Logout middlewares
router.all('/logout', authController.Logout);

export default router;

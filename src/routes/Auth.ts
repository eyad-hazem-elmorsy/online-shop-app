import express, { Router } from 'express';
import authController from '../controllers/AuthController';

const router: Router = express.Router();

// Signup middlewares
router.get('/signup', authController.getSignup);
router.post('/:id', express.urlencoded({extended: true}), authController.postSignup);

// Login middlewares
router.get('/login', authController.getLogin);

export default router;
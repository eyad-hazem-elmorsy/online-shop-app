import express, { Router } from 'express';
import cartController from '../controllers/CartController';
import authGuard from './guards/auth.guard';
import ExpressValidators from '../middlewares/ExpressValidators';

const router: Router = express.Router();

// Cart middlewares
router.post(
    '/',
    authGuard.isAuth,
    ExpressValidators.addCartItem,
    cartController.postCart
);

export default router;

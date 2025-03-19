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
router.get('/', cartController.getCart);

router.post(
    '/save',
    authGuard.isAuth,
    ExpressValidators.addCartItem,
    cartController.postSave
);

router.post('/delete', authGuard.isAuth, cartController.postDelete);

router.post('/delete-all', authGuard.isAuth, cartController.postDeleteAll);

export default router;

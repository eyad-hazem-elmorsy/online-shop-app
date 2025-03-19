import express, { Router } from 'express';
import orderController from '../controllers/OrderController';
import authGuard from './guards/auth.guard';
import ExpressValidators from '../middlewares/ExpressValidators';

const router: Router = express.Router();

// Cart middlewares
router.post(
    '/',
    authGuard.isAuth,
    ExpressValidators.placeOrder,
    orderController.postOrder
);
router.get('/', authGuard.isAuth, orderController.getOrders);

router.post(
    '/cancel',
    authGuard.isAuth,
    orderController.postCancel
);

router.post(
    '/cancel-all',
    authGuard.isAuth,
    orderController.postCancelAll
);

router.get('/verify', authGuard.isAuth, orderController.getVerify);

export default router;

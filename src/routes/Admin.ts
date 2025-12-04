import express, { Router } from 'express';
import adminController from '../controllers/AdminController';
import adminGuard from './guards/admin.guard';
import imageUpload from '../middlewares/imageUpload';
import { expressValidators } from '../middlewares';
const router: Router = express.Router();

router.get('/add', adminGuard, adminController.getAdd);
router.post(
    '/add',
    adminGuard,
    imageUpload,
    expressValidators.uploadImage,
    adminController.postAdd
);

router.get('/orders', adminGuard, adminController.getManageOrders);
router.post('/orders/:id', adminGuard, adminController.postManageOrders);

export default router;

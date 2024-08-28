import express, { Router } from 'express';
import homeController from '../controllers/HomeController';
import productController from '../controllers/ProductController';

const router: Router = express.Router();

// Product page middlewares
router.get('/', homeController.get);
router.get('/:id', productController.get);

export default router;
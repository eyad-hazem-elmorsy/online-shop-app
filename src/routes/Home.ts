import express, { Router } from 'express';
import controller from '../controllers/HomeController'

const router: Router = express.Router();

// Home page middlewares
router.get('/', controller.get);

export default router;
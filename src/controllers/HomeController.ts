import { Request, Response } from 'express';
import { IProduct, getAllProducts } from '../models/product';

export default {
    // Requests' handlers
    get: async (req: Request, res: Response) => {
        const products: IProduct[] = await getAllProducts();
        res.render('index', { products });
    }
}
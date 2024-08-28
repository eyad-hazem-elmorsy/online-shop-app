import { Request, Response } from 'express';
import { getProductsById } from '../models/product';

export default {
    // Requests' handlers
    get: async (req: Request, res: Response) => {
        const id = req.params.id;
        const product = await getProductsById(id);
        res.render('product', { product })
    }
}
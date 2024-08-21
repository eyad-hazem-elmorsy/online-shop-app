import { Request, Response } from 'express';
import { IProduct, getProducts } from '../models/product';

export default {
    // Requests' handlers
    get: async (req: Request, res: Response) => {
        const category: string = String(req.query.category);
        const validCategories = ['clothes', 'phones', 'computers'];
        let products: IProduct[];
        if (category && validCategories.includes(category))
            products = await getProducts(category);
        else
            products = await getProducts('all');
        res.render('index', { products });
    }
}
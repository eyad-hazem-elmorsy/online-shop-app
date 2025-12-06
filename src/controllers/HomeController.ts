import { Request, Response } from 'express';
import {
    IProduct,
    getProducts,
    validCategories,
    Category
} from '../models/product';
import MiddlewareWrapper from '../Utils/MiddlewareWrapper';

export default {
    // Requests' handlers
    get: MiddlewareWrapper(async (req: Request, res: Response) => {
        const category: string = String(req.query.category);
        let products: IProduct[];
        if (category && validCategories.includes(category as Category))
            products = await getProducts(category);
        else products = await getProducts();
        res.render('index', {
            products: products,
            validationError: req.flash('validationErrors')[0]
        });
    })
};

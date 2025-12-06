import { Request, Response } from 'express';
import { getProductsById } from '../models/product';
import MiddlewareWrapper from '../Utils/MiddlewareWrapper';

export default {
    // Requests' handlers
    get: MiddlewareWrapper(async (req: Request, res: Response) => {
        const id = req.params.id;
        const product = await getProductsById(id);
        res.render('product', {
            product: product,
            validationError: req.flash('validationErrors')[0]
        });
    })
};

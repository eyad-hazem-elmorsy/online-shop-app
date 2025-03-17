import { Request, Response } from 'express';
import MiddlewareWrapper from '../Utils/MiddlewareWrapper';
import { addNewItem } from '../models/cart';

export default {
    // Requests' handlers
    postCart: MiddlewareWrapper(async (req: Request, res: Response) => {
        await addNewItem({
            name: req.body.name,
            amount: req.body.amount,
            price: req.body.price,
            productId: req.body.productId,
            userId: String(req.session.user!._id),
            timestamp: Date.now()
        });
        res.redirect('/cart');
    })
};

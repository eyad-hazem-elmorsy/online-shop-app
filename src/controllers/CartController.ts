import { Request, Response } from 'express';
import MiddlewareWrapper from '../Utils/MiddlewareWrapper';
import { addNewItem, CartItem, deleteAllItems, deleteItem, editItem, getItemsByUserId } from '../models/cart';
import { timeStamp } from 'console';

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
    }),

    getCart: async (req: Request, res: Response) => {
        const items = await getItemsByUserId(String(req.session.user!._id));
        res.render('cart', { items: items, validationError: req.flash('validationErrors')[0] });
    },

    postSave: MiddlewareWrapper(async (req: Request, res: Response) => {
        await editItem(req.body.cartId, { amount: req.body.amount, timestamp: Date.now() });
        res.redirect('/cart');
    }, '/cart'),

    postDelete: MiddlewareWrapper(async (req: Request, res: Response) => {
        await deleteItem(req.body.cartId);
        res.redirect('/cart');
    }, '/cart'),

    postDeleteAll: MiddlewareWrapper(async (req: Request, res: Response) => {
        await deleteAllItems();
        res.redirect('/cart');
    }, '/cart'),
};

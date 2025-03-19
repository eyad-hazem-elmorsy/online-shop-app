import { Request, Response } from 'express';
import MiddlewareWrapper from '../Utils/MiddlewareWrapper';
import {
    addNewOrder,
    cancelAllOrders,
    cancelOrder,
    getOrdersByUserId
} from '../models/order';
import { CartItem, deleteAllItems, getItemsByUserId } from '../models/cart';
import DatabasePromiseWrapper from '../Utils/DatabasePromiseWrapper';
import ValidationError from '../errors/ValidationError';

export default {
    // Requests' handlers
    postOrder: MiddlewareWrapper(async (req: Request, res: Response) => {
        const items = await getItemsByUserId(String(req.session.user!._id));
        if (!items.length)
            throw new ValidationError({
                msg: 'The cart is empty',
                type: 'field',
                location: 'headers',
                path: 'cart'
            });
        const cost = items.reduce(
            (acc, cur) => acc + cur.amount * cur.price,
            0
        );
        await addNewOrder({
            items: items,
            cost: cost,
            address: req.body.address,
            status: 'pending',
            userId: String(req.session.user!._id),
            timestamp: Date.now()
        });
        await deleteAllItems(String(req.session.user!._id));
        res.redirect('/orders');
    }, '/cart'),

    getOrders: MiddlewareWrapper(async (req: Request, res: Response) => {
        const orders = await getOrdersByUserId(String(req.session.user!._id));
        res.render('orders', {
            orders: orders,
            validationError: req.flash('validationErrors')[0]
        });
    }),

    postCancel: MiddlewareWrapper(async (req: Request, res: Response) => {
        await cancelOrder(req.body.orderId, String(req.session.user!._id));
        res.redirect('/orders');
    }, '/orders'),

    postCancelAll: MiddlewareWrapper(async (req: Request, res: Response) => {
        await cancelAllOrders(String(req.session.user!._id));
        res.redirect('/orders');
    }, '/orders'),

    getVerify: MiddlewareWrapper(async (req: Request, res: Response) => {
        const items = await getItemsByUserId(String(req.session.user!._id));
        if (items.length) res.render('verify-order');
        else
            throw new ValidationError({
                msg: 'The cart is empty',
                type: 'field',
                location: 'headers',
                path: 'cart'
            });
    }, '/cart')
};

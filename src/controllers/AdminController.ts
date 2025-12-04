import { Request, Response } from 'express';
import MiddlewareWrapper from '../Utils/MiddlewareWrapper';
import { validationResult } from 'express-validator';
import { addNewProduct } from '../models/product';
import { getOrders, updateOrderStatus } from '../models/order';
import { getEmailsByIds } from '../models/auth';

export default {
    getAdd: (req: Request, res: Response) => {
        res.render('add-product', {
            validationErrors: req.flash('validationErrors'),
            Error: req.flash('Error')[0]
        });
    },

    postAdd: MiddlewareWrapper(async (req: Request, res: Response) => {
        await addNewProduct({
            name: req.body.name,
            price: +req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: '/images/' + req.file!.filename
        });
        res.redirect('/');
    }, '/admin/add'),

    getManageOrders: async (req: Request, res: Response) => {
        const status = req.query.status;
        const email = req.query.email;
        const orders = await getOrders(status as string, email as string);
        const ids = orders.map(order => order.userId);
        const emails = await getEmailsByIds(ids);
        res.render('manage-orders', {
            orders: orders,
            emails: emails,
            validationError: req.flash('validationErrors')[0]
        });
    },

    postManageOrders: MiddlewareWrapper(async (req: Request, res: Response) => {
        await updateOrderStatus(req.params.id, req.body.status);
        res.redirect('/admin/orders');
    }, '/admin/orders')
};

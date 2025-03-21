import { Request, Response } from 'express';
import MiddlewareWrapper from '../Utils/MiddlewareWrapper';
import { validationResult } from 'express-validator';
import { addNewProduct } from '../models/product';

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
};

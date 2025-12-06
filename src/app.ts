import express, { Express, ErrorRequestHandler } from 'express';
import homeRoute from './routes/Home';
import authRoute from './routes/Auth';
import productRoute from './routes/Product';
import cartRoute from './routes/Cart';
import orderRoute from './routes/Order';
import adminRoute from './routes/Admin';
import { sessionMiddleware } from './middlewares';
import flash from 'connect-flash';
import BaseError from './errors/BaseError';
import InternalServerError from './errors/InternalServerError';
import NotFoundError from './errors/NotFoundError';

// Create application
const app: Express = express();

// Determine assets path
app.use(express.static('assets'));
app.use('/images', express.static('images'));
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(sessionMiddleware);

// Setting a template engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routing
app.use((req, res, next) => {
    res.locals.isUser = req.session.user;
    res.locals.isAdmin = req.session.user?.isAdmin;
    next();
});
app.use('/', homeRoute);
app.use('/', authRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/orders', orderRoute);
app.use('/admin', adminRoute);

app.get('/error', (req, res, next) => {
    const Error = req.flash('Error')[0];
    res.render('error', { Error });
});

app.use((req, res, next) => {
    next(new NotFoundError());
});

const ErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof BaseError) req.flash('Error', err);
    else req.flash('Error', new InternalServerError());
    res.redirect(req.body.redirectTo || req.redirectTo || '/error');
};

app.use(ErrorMiddleware);

export default app;

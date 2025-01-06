import express, { Express } from 'express';
import homeRoute from './routes/Home';
import authRoute from './routes/Auth';
import productRoute from './routes/Product';
import { sessionMiddleware } from './middlewares';
import flash from 'connect-flash';

// Create application
const app: Express = express();

// Determine assets path
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(sessionMiddleware);

// Setting a template engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routing
app.use('/', homeRoute);
app.use('/', authRoute);
app.use('/product', productRoute);

export default app;

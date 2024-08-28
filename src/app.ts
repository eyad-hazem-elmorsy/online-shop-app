import express, { Express } from 'express';
import homeRoute from './routes/Home';
import productRoute from './routes/Product';

// Create application
const app: Express = express();

// Determine assets path
app.use(express.static('assets'));

// Setting a template engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routing
app.use('/', homeRoute);
app.use('/product', productRoute);

export default app;
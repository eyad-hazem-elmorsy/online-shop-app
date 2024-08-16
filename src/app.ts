import express, { Express } from 'express';

// Create application
const app: Express = express();

// Determine assets path
app.use(express.static('assets'));

// Setting a template engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

export default app;
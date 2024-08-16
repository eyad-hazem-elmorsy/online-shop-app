import express, { Express } from 'express';

const app: Express = express();

// Setting a template engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

export default app;
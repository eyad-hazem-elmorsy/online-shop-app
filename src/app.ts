import express, { Express } from 'express';
import path from 'path';

// Create application
const app: Express = express();

// Determine assets path
app.use(express.static(path.join(__dirname, 'assets')));

// Setting a template engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

export default app;
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

// Import the application
import app from './app';

// Initialize port
const port: number = Number(process.env.PORT) || 5000;

// Server listener
app.listen(port, (): void => {
    console.log(`App listening on port ${port}`);
});
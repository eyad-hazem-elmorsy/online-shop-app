import mongoose, { Document, Schema } from 'mongoose';
import databasePromiseWrapper from '../Utils/DatabasePromiseWrapper';

const dbUrl: string =
    process.env.DB_URL || 'mongodb://localhost:27017/online-shop';

// Identifying
interface ICartItem extends Document {
    name: string;
    price: number;
    amount: number;
    userId: string;
    productId: string;
    timestamp: number;
}

interface AddNewItemArgs {
    name: string;
    price: number;
    amount: number;
    userId: string;
    productId: string;
    timestamp: number;
}

const cartSchema: Schema<ICartItem> = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    timestamp: { type: Number, required: true }
});

const CartItem = mongoose.model<ICartItem>('Cart', cartSchema);

// Services
const addNewItem = async (data: AddNewItemArgs) => {
    return databasePromiseWrapper(async () => {
        const item = new CartItem(data);
        return await item.save();
    });
};

export { ICartItem, CartItem, addNewItem };

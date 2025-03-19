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
        const item = await CartItem.findOne({ productId: data.productId });
        let newItem = new CartItem(data);
        if (item) {
            newItem.amount += item!.amount;
            await CartItem.findByIdAndDelete(item._id);
        }
        return await newItem.save();
    });
};

const getItemsByUserId = async (userId: string) => {
    return databasePromiseWrapper(async () => {
        return await CartItem.find({ userId: userId }, {}, { sort: { timestamp: 1 } });
    });
}

const editItem = async (id: string, newData: Partial<ICartItem>) => {
    return databasePromiseWrapper(async () => {
        await CartItem.updateOne({ _id: id }, { $set: newData });
    });
};

const deleteItem = async (id: string, userId: string) => {
    return databasePromiseWrapper(async () => {
        await CartItem.findOneAndDelete({ _id: id, userId: userId });
    });
};

const deleteAllItems = async (userId: string) => {
    return databasePromiseWrapper(async () => {
        await CartItem.deleteMany({ userId: userId });
    });
};

export { ICartItem, CartItem, addNewItem, getItemsByUserId, editItem, deleteItem, deleteAllItems };

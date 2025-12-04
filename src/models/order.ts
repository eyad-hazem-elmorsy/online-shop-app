import mongoose, { Document, Schema } from 'mongoose';
import databasePromiseWrapper from '../Utils/DatabasePromiseWrapper';
import { ICartItem } from './cart';
import { getIdByEmail } from './auth';

const dbUrl: string =
    process.env.DB_URL || 'mongodb://localhost:27017/online-shop';

// Identifying
interface IOrder extends Document {
    items: ICartItem[];
    cost: number;
    address: string;
    userId: string;
    status: string;
    timestamp: number;
}

interface AddNewOrderArgs {
    items: ICartItem[];
    cost: number;
    address: string;
    userId: string;
    status: string;
    timestamp: number;
}

const orderSchema: Schema<IOrder> = new Schema({
    items: {
        type: [
            {
                name: String,
                price: Number,
                amount: Number,
                userId: String,
                productId: String,
                timestamp: Number
            }
        ],
        required: true
    },
    cost: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, required: true },
    timestamp: { type: Number, required: true }
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

// Services
const getOrders = async (status: string, email: string) => {
    const userId = await getIdByEmail(email);
    return databasePromiseWrapper(async () => {
        if (!status && !userId)
            return await Order.find({}, {}, { sort: { timestamp: 1 } });
        else if (status === 'all' && !userId)
            return await Order.find({}, {}, { sort: { timestamp: 1 } });
        else if (status === 'all')
            return await Order.find(
                { userId: userId },
                {},
                { sort: { timestamp: 1 } }
            );
        else if (!userId)
            return await Order.find(
                { status: status },
                {},
                { sort: { timestamp: 1 } }
            );
        else
            return await Order.find(
                { status: status, userId: userId },
                {},
                { sort: { timestamp: 1 } }
            );
    });
};

const addNewOrder = async (data: AddNewOrderArgs) => {
    return databasePromiseWrapper(async () => {
        const order = new Order(data);
        return await order.save();
    });
};

const getOrdersByUserId = async (userId: string) => {
    return databasePromiseWrapper(async () => {
        return await Order.find(
            { userId: userId },
            {},
            { sort: { timestamp: 1 } }
        );
    });
};

const updateOrderStatus = async (id: string, status: string) => {
    return databasePromiseWrapper(async () => {
        return await Order.findByIdAndUpdate(id, { status: status });
    });
};

const cancelOrder = async (id: string, userId: string) => {
    return databasePromiseWrapper(async () => {
        await Order.findOneAndDelete({ _id: id, userId: userId });
    });
};

const cancelAllOrders = async (userId: string) => {
    return databasePromiseWrapper(async () => {
        await Order.deleteMany({ userId: userId });
    });
};

export {
    IOrder,
    Order,
    getOrders,
    addNewOrder,
    getOrdersByUserId,
    cancelOrder,
    cancelAllOrders,
    updateOrderStatus
};

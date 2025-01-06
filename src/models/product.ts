import mongoose, { Document, Schema } from 'mongoose';
import databasePromiseWrapper from '../Utils/DatabasePromiseWrapper';

const dbUrl: string =
    process.env.DB_URL || 'mongodb://localhost:27017/online-shop';

// Identifying
interface IProduct extends Document {
    name: string;
    image?: string;
    price: number;
    description?: string;
    category?: string;
}

const productSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    category: { type: String, required: false }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

const validCategories = ['clothes', 'phones', 'computers'] as const;
type Category = (typeof validCategories)[number];

// Services
const getProducts = async (category: string = 'all') => {
    return databasePromiseWrapper(async () => {
        const products = Product.find();
        if (category != 'all') products.find({ category: category });
        return await products;
    });
};

const getProductsById = (id: string) => {
    return databasePromiseWrapper(async () => {
        return await Product.findById(id);
    });
};

export {
    Product,
    IProduct,
    getProducts,
    getProductsById,
    validCategories,
    Category
};

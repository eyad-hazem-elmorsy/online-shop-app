import mongoose, { Document, Schema } from 'mongoose';

const dbUrl: string = process.env.DB_URL || 'mongodb://localhost:27017/online-shop';

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

// Services
const getProducts = (category: string): Promise<IProduct[]> => {
    return new Promise<IProduct[]>((resolve, reject) => {
        mongoose.connect(dbUrl).then(() => {
            if (category === 'all')
                return Product.find({});
            else
                return Product.find({ category: category });
        }).then((products: IProduct[]) => {
            mongoose.disconnect();
            resolve(products);
        }).catch((error: Error) => {
            reject(error);
        });
    });
}

export { Product, IProduct, getProducts };
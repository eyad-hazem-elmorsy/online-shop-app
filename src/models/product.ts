import mongoose, {Document, Schema} from 'mongoose';

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

export { Product, IProduct };
import mongoose, { Document, Schema } from 'mongoose';

const dbUrl: string =
    process.env.DB_URL || 'mongodb://localhost:27017/online-shop';

export default async <T>(promise: () => Promise<T>) => {
    try {
        await mongoose.connect(dbUrl);
        const ret = await promise();
        mongoose.disconnect();
        return ret;
    } catch (err) {
        mongoose.disconnect();
        throw err;
    }
};

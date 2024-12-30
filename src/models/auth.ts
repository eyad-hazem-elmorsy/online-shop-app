import mongoose, { Document, Schema } from 'mongoose';
import bcrybt from 'bcrypt';
import databasePromiseWrapper from '../Utils/DatabasePromiseWrapper';

const dbUrl: string = process.env.DB_URL || 'mongodb://localhost:27017/online-shop';

// Identifying
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', userSchema);

// Services

const createNewUser = async (username: string, email: string, password: string) => {
    return databasePromiseWrapper(async () => {
        // Check if user exists
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            mongoose.disconnect();
            throw new Error('E-mail is used');
        }

        // Creating new user
        const hashedPassword = await bcrybt.hash(password, 10);
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        await user.save();
        return user;
    })
}

export { User, IUser, createNewUser };
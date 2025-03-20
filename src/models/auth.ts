import mongoose, { Document, Schema } from 'mongoose';
import bcrybt from 'bcrypt';
import databasePromiseWrapper from '../Utils/DatabasePromiseWrapper';
import DuplicateEmailError from '../errors/DuplicateEmailError';
import InvalidCredentialsError from '../errors/InvalidCredentialsError';

const dbUrl: string =
    process.env.DB_URL || 'mongodb://localhost:27017/online-shop';

// Identifying
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model<IUser>('User', userSchema);

// Services

const createNewUser = async (
    username: string,
    email: string,
    password: string
) => {
    return databasePromiseWrapper(async () => {
        // Check if user exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) throw new DuplicateEmailError();

        // Creating new user
        const hashedPassword = await bcrybt.hash(password, 10);
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        await user.save();
        return user;
    });
};

const login = async (email: string, password: string) => {
    return databasePromiseWrapper(async () => {
        // Check if user is not existing
        const user = await User.findOne({ email: email });
        if (!user) throw new InvalidCredentialsError();

        // Password comparing
        const same = await bcrybt.compare(password, user.password);
        if (!same) throw new InvalidCredentialsError();

        return user;
    });
};

export { User, IUser, createNewUser, login };

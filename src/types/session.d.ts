import 'express-session';
import { IUser } from '../models/auth';

declare module 'express-session' {
    export interface SessionData {
        user: IUser;
    }
}

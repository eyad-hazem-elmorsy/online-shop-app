import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';

const SessionStore = ConnectMongoDBSession(session);

const STORE = new SessionStore({
    uri: process.env.DB_URL || 'mongodb://localhost:27017/online-shop',
    collection: 'sessions'
});

const sessionMiddleware = session({
    secret: 'This is an elephant playing MarvelRivals',
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 60 * 60 * 1000
    },
    store: STORE,
    resave: false
})

export default sessionMiddleware;
import { Logger } from '@nestjs/common';
import ConnectMongo from 'connect-mongodb-session';
import session from 'express-session';
import { MONGODB_URL, SESSION_SECRET } from '../../env';

const MongoStore = ConnectMongo(session);
const store = new MongoStore({ uri: MONGODB_URL, collection: 'sessions' });
store.on('error', (error: Error) => Logger.error(error.message, error.stack, error.name));

export const sessionStore = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
});

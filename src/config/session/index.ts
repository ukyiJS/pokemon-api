import { Logger } from '@nestjs/common';
import ConnectMongo from 'connect-mongodb-session';
import express from 'express';
import session from 'express-session';

export const createSessionStore = (url: string, secret: string): express.RequestHandler => {
  const MongoStore = ConnectMongo(session);
  const store = new MongoStore({ uri: url, collection: 'sessions' });
  store.on('error', (error: Error) => Logger.error(error.message, error.stack, error.name));

  return session({
    secret,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  });
};

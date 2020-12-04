import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ConnectMongo from 'connect-mongodb-session';
import express from 'express';
import session from 'express-session';

export const createSessionStore = (app: INestApplication): express.RequestHandler => {
  const config = app.get(ConfigService);
  const url = config.get('database.url');
  const secret = config.get('sessionSecret');
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

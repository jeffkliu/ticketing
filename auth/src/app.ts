import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signUpRouter } from './routes/signup';
import { signOutRouter } from './routes/signout';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.get('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export {app};
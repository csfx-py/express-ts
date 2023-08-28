import dotenv from 'dotenv';
dotenv.config();
import { checkEnv } from './utils/env';
checkEnv();

import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { HttpError } from './helpers/HttpError';
import routes from './routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', routes);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    return res
        .status(err.code < 600 ? err.code : 500)
        .json({ ...err, message: err.message });
});

export default app;

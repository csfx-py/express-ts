import Joi from 'joi';
import { HttpError } from '../helpers/HttpError';
import { NextFunction, Request, RequestHandler, Response } from 'express';

type RequestPayloadIn = 'body' | 'query' | 'params';

const validator =
    (args: Partial<Record<RequestPayloadIn, Joi.AnySchema>>): RequestHandler =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const keys = Object.keys(args) as RequestPayloadIn[];

            for (const key of keys) {
                const payload = req[key];
                const validator = args[key];

                if (validator) {
                    const result = validator.validate(payload);
                    if (result.error) {
                        return next(
                            new HttpError({
                                code: 422,
                                message:
                                    process.env.NODE_ENV === 'development'
                                        ? `${result.error.message} in ${key}`
                                        : result.error.message,
                            })
                        );
                    }

                    if (result.value) {
                        req[key] = result.value;
                    }
                }
            }
            return next();
        } catch (err) {
            next(
                new HttpError({
                    code: 500,
                    message: (err as Error).stack,
                })
            );
        }
    };

export default validator;

import { RequestHandler } from 'express';
import { HttpError } from '../helpers/HttpError';
import jwt from 'jsonwebtoken';
import { AuthToken, IRequestUser } from '../types';
import userService from '../services/user.service';

interface TokenVerificationOptions {
    strict: boolean;
    resetToken?: boolean;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user?: IRequestUser;
            strictTokenCheck?: boolean;
        }
    }
}

export const verifyToken = (
    options: TokenVerificationOptions = {
        strict: true,
        resetToken: false,
    }
): RequestHandler => {
    return async (req, res, next) => {
        try {
            req.strictTokenCheck = options.strict;
            const token = req.headers.authorization
                ?.replace('Bearer', '')
                .trim();
            if (!token) {
                if (!options.strict) {
                    return next();
                }
                throw new HttpError({
                    code: 401,
                    message: 'Unauthorized',
                });
            }
            const { id, reset = false } = jwt.verify(
                token,
                process.env.JWT_TOKEN_SECRET!
            ) as unknown as AuthToken;

            const user = await userService.getUserById(id);

            if (!user) {
                throw new HttpError({
                    code: 401,
                    message: 'Unauthorized',
                });
            }

            if (
                (reset && !options.resetToken) ||
                (!reset && options.resetToken)
            ) {
                throw new HttpError({
                    code: 401,
                    message: 'Unauthorized',
                });
            }

            req.user = {
                id: user.id,
                email: user.email,
            };
            return next();
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                code: 401,
                message: 'Unauthorized',
            });
        }
    };
};

import { HttpError } from '@/helpers/HttpError';
import { IRequestUser } from '@/types';
import { RolesEnum } from '@/types/role.types';
import { NextFunction, Request, Response } from 'express';

export const roleChecker = (roles: RolesEnum[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IRequestUser;

        if (!roles.includes(user.role)) {
            return next(
                new HttpError({
                    message:
                        'You do not have permission to perform this action',
                    code: 403,
                })
            );
        }

        next();
    };
};

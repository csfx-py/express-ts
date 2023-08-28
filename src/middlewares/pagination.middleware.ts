import { NextFunction, Request, Response } from 'express';
import configs from '../configs';
import { PaginationOptions, IPagination } from '../types/pagination.types';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            pagination: Required<IPagination>;
        }
    }
}

export const paginationMiddleware =
    (
        options: PaginationOptions = {
            maxLimit: configs.MAX_DEFAULT_PAGINATION_LIMIT,
        }
    ) =>
    (
        req: Request<object, object, object, IPagination>,
        res: Response,
        next: NextFunction
    ) => {
        const { maxLimit = configs.MAX_DEFAULT_PAGINATION_LIMIT } = options;
        const {
            limit = maxLimit,
            order,
            page = 1,
            sort = 'createdAt',
        } = req.query;
        req.query.page = page < 1 ? 1 : parseInt(page as unknown as string);
        req.query.limit =
            limit > maxLimit ? maxLimit : parseInt(limit as unknown as string);
        req.query.limit =
            limit < 1 ? maxLimit : parseInt(limit as unknown as string);

        req.query.order = order === 'asc' ? 'asc' : 'desc';

        req.pagination = {
            limit: req.query.limit,
            page: req.query.page,
            order: req.query.order,
            sort,
        };
        next();
    };

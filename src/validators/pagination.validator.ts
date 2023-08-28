import { IPagination } from '@/types';
import Joi from 'joi';

const paginationValidator = Joi.object<IPagination>({
    page: Joi.number().min(1).optional().default(1),
    limit: Joi.number().min(1).optional().default(10),
    sort: Joi.string().optional(),
    order: Joi.string().valid('asc', 'desc').optional(),
});

export default paginationValidator;

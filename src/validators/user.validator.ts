import Joi from '@/helpers/Joi';
import { LoginPayload, RegisterUserPayload, UpdateUserPayload } from '../types';

const register = Joi.object<RegisterUserPayload>({
    email: Joi.string().email().optional(),
    name: Joi.string().required(),
    password: Joi.string().required(),
});

const update = Joi.object<UpdateUserPayload>({
    name: Joi.string().optional(),
    password: Joi.string().optional(),
});

const login = Joi.object<LoginPayload>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export default {
    register,
    login,
    update,
};

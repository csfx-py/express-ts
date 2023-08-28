import { User as IUser } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '@/models';
import bcryptjs from 'bcryptjs';
import { HttpError } from '../helpers/HttpError';
import { AuthToken } from '../types';
import userService from './user.service';

const generateAuthToken = (userId: string) => {
    const authTokenPayload: AuthToken = {
        id: userId,
    };

    const token = jwt.sign(
        authTokenPayload,
        process.env.JWT_TOKEN_SECRET as Secret,
        {
            expiresIn: `${process.env.JWT_TOKEN_EXPIRES_IN}`,
        }
    );

    return token;
};

const loginWithEmail = async (email: string) => {
    const user = await userService.getUserByEmail(email);
};

const loginWithPassword = async (email: string, password: string) => {
    const user = await User.findUnique({ where: { email } });

    if (!user) {
        throw new HttpError({ code: 401, message: 'Invalid credentials!' });
    }

    const isMatch = await bcryptjs.compare(password, user.password ?? '');

    if (!isMatch) {
        throw new HttpError({ code: 401, message: 'Invalid credentials!' });
    }

    const token = generateAuthToken(user.id);
    return token;
};

export default {
    generateAuthToken,
    loginWithEmail,
    loginWithPassword,
};

import bcrypt from 'bcryptjs';
import { User } from '@/models';
import { User as IUser } from '@prisma/client';
import { CreateUserPayload, IRequestUser, UpdateUserPayload } from '@/types';
import { HttpError } from '../helpers/HttpError';
// import configs from '../configs';

const getUserById = async (userId: string) => {
    const user = await User.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            name: true,
            password: false,
        },
    });
    if (!user) {
        throw new HttpError({ message: 'User not found!', code: 404 });
    }

    return {
        ...user,
    };
};

const update = async (payload: UpdateUserPayload, userId: string) => {
    if (payload.password) {
        const hashedPassword = bcrypt.hashSync(payload.password);
        payload.password = hashedPassword;
    }

    const user = await User.update({
        where: {
            id: userId,
        },
        data: {
            ...payload,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }
    return await getUserById(user.id);
};

const getUserByEmail = async (email: string) => {
    const user = await User.findUnique({
        where: { email },
        select: {
            password: false,
        },
    });
    if (!user) {
        throw new HttpError({ message: 'User not found!', code: 404 });
    }

    return {
        ...user,
    };
};

const createUser = async (payload: CreateUserPayload) => {
    const existingUser = await User.findUnique({
        where: { email: payload.email },
    });

    if (existingUser) {
        throw new HttpError({ message: 'User already exists!', code: 409 });
    }

    const createQuery: CreateUserPayload = {
        ...payload,
    };

    if (payload.password) {
        const hashedPassword = bcrypt.hashSync(payload.password);
        createQuery.password = hashedPassword;
    }

    const user = await User.create({
        data: createQuery,
    });

    return await getUserById(user.id);
};

const getUsersByIds = async (userIds: string[]) => {
    const users = await User.findMany({
        where: { id: { in: userIds } },
        select: { password: false },
    });

    return users;
};

const deleteUserById = async (userId: string) => {
    await User.delete({ where: { id: userId } });
};

export default {
    update,
    getUserById,
    createUser,
    getUserByEmail,
    getUsersByIds,
    deleteUserById,
};

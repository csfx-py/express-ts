import { User } from '@prisma/client';

export interface IRequestUser {
    id: User['id'];
    email: User['email'];
}

export type CreateUserPayload = Pick<User, 'email' | 'name' | 'password'>;

export type UpdateUserPayload = Partial<Pick<User, 'name' | 'password'>>;

import { User } from '@prisma/client';

// RegisterUserPayload, LoginPayload
export type RegisterUserPayload = Pick<User, 'email' | 'name' | 'password'>;

export type LoginPayload = Pick<User, 'email' | 'password'>;

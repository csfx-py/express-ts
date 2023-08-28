import { JwtPayload } from 'jsonwebtoken';

export interface AuthToken extends JwtPayload {
    id: string;
}

export interface ResetToken extends AuthToken {
    reset: true;
}

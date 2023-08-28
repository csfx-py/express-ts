import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { RegisterUserPayload, LoginPayload } from '../types';
import userService from '../services/user.service';

const login = async (
    req: Request<object, object, LoginPayload>,
    res: Response
) => {
    const { email, password } = req.body;

    const token = await authService.loginWithPassword(email, password);

    return res.status(200).json({
        message: 'Login successful!',
        token,
    });
};

const register = async (
    req: Request<object, object, RegisterUserPayload>,
    res: Response
) => {
    const { email, name, password } = req.body;
    await userService.createUser({
        email,
        name,
        password,
    });

    return res.status(200).json({
        message: `Registration successful!`,
    });
};

const me = async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.user!.id);
    return res.status(200).json({
        user,
    });
};

export default {
    login,
    register,
    me,
};

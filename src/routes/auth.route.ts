import { Router } from 'express';
import { catchAsync } from 'catch-async-express';

import authController from '../controllers/auth.controller';
import validator from '../middlewares/validator.middleware';
import userValidator from '../validators/user.validator';
import { verifyToken } from '@/middlewares/verifyToken.middleware';

const router = Router();

router.post(
    '/login',
    validator({ body: userValidator.login }),
    catchAsync(authController.login)
);

router.post(
    '/register',
    validator({ body: userValidator.register }),
    catchAsync(authController.register)
);

router.get('/me', verifyToken({ strict: true }), catchAsync(authController.me));

export default router;

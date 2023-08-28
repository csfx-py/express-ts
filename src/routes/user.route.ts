import { upload } from '@/helpers/multer';
import { verifyToken } from '@/middlewares/verifyToken.middleware';
import { catchAsync } from 'catch-async-express';
import { Router } from 'express';

const router = Router();

export default router;

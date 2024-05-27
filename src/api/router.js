import { Router } from 'express';

import userRouter from './user/user.router.js';

const router = Router()
    .use(userRouter);

export default router;

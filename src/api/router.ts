import { Router } from 'express';

import userRouter from './user/user.router';

const router = Router()
    .use(userRouter);

export default router;

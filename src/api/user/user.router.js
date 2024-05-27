import { Router } from 'express';

import * as userController from './user.controller.js';

const router = Router();

router.get('/users', userController.findAll);
router.post('/users', userController.create);
router.get('/users/:id', userController.findOne);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.remove);

export default router;

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { updateUserAvatar } from '../controllers/userController.js';

const router = Router();

router.patch('/user/me/avatar', authenticate, updateUserAvatar);

export default router;

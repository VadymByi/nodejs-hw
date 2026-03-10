import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginUser, registerUser } from '../controllers/authController';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

export default router;

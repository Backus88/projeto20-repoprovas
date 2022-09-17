import { Router } from 'express';
import { controlUser, controlLogin } from '../controllers/authController';
import joiValidation from '../middlewares/joiValidation';
import { registerSchema } from '../schemas/registerSchema';
import { loginSchema } from '../schemas/loginSchema';

const authRouter = Router();

authRouter.post('/login', joiValidation(loginSchema), controlLogin);
authRouter.post('/register', joiValidation(registerSchema), controlUser);

export default authRouter;

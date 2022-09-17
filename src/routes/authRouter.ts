import { Router } from 'express';
import { controlUser } from '../controllers/authController';
import joiValidation from '../middlewares/joiValidation';
import { registerSchema } from '../schemas/registerSchema';

const authRouter = Router();

authRouter.post('/login');
authRouter.post('/register', joiValidation(registerSchema), controlUser);

export default authRouter;

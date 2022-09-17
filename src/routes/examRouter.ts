import { Router } from 'express';
import joiValidation from '../middlewares/joiValidation';
import { controlExamCreation } from '../controllers/examController';
import { examSchema } from '../schemas/examSchema';

const examRouter = Router();

examRouter.post('/exam', joiValidation(examSchema), controlExamCreation);
examRouter.get('/period');
examRouter.get('/teacher');

export default examRouter;

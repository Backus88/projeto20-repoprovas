import { Router } from 'express';
import joiValidation from '../middlewares/joiValidation';
import {
    controlExamCreation,
    controlGetExams,
    controlExamsTeachers,
} from '../controllers/examController';
import { examSchema } from '../schemas/examSchema';

const examRouter = Router();

examRouter.post('/exam', joiValidation(examSchema), controlExamCreation);
examRouter.get('/period', controlGetExams);
examRouter.get('/teacher', controlExamsTeachers);

export default examRouter;

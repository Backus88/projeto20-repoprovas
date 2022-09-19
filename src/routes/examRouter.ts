import { Router } from 'express';
import joiValidation from '../middlewares/joiValidation';
import {
    controlExamCreation,
    controlGetExams,
    controlExamsTeachers,
} from '../controllers/examController';
import { examSchema } from '../schemas/examSchema';
import tokenValidation from '../middlewares/tokenValidation';

const examRouter = Router();

examRouter.post(
    '/exam',
    tokenValidation,
    joiValidation(examSchema),
    controlExamCreation
);
examRouter.get('/period', tokenValidation, controlGetExams);
examRouter.get('/teacher', tokenValidation, controlExamsTeachers);

export default examRouter;

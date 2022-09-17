import { Router } from 'express';

const examRouter = Router();

examRouter.post('/exam');
examRouter.get('/period');
examRouter.get('/teacher');

export default examRouter;

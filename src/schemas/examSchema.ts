import joi from 'joi';
import { Body } from '../types/types';

export const examSchema = joi.object<Body>({
    name: joi.string().min(1).max(64).required(),
    pdfUrl: joi
        .string()
        .regex(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
        )
        .required(),
    category: joi.string().min(1).max(64).required(),
    discipline: joi.string().min(1).max(64).required(),
    teacher: joi.string().min(1).max(64).required(),
});

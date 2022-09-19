import joi from 'joi';

export const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(1).max(128).required(),
    confirmPassword: joi.string().required().valid(joi.ref('password')),
});

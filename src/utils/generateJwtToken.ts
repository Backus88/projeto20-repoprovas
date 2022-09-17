import jwt from 'jsonwebtoken';
import { notFoundError } from './errorMessages';
import dotenv from 'dotenv';

dotenv.config();

export default function generateJwtToken(userId: number) {
    const key = process.env.SECRET_KEY;
    const data = {
        userId: userId,
    };
    if (!key) {
        throw notFoundError('key');
    }
    return jwt.sign(data, key, { expiresIn: process.env.EXPIRATION_TIME });
}

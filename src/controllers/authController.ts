import { Request, Response } from 'express';
import {
    emailExists,
    createUser,
    emailNotExists,
    checkCredentials,
    generateToken,
} from '../services/authServices';
import { userInsertType } from '../types/types';

export async function controlUser(req: Request, res: Response) {
    const { password, email } = req.body;
    const data: userInsertType = {
        email: email,
        password: password,
    };
    await emailExists(data.email);
    await createUser(data);
    res.sendStatus(201);
}

export async function controlLogin(req: Request, res: Response) {
    const user: userInsertType = req.body;
    const data = await emailNotExists(user.email);
    await checkCredentials(data.password, user.password);
    const token = await generateToken(data.id);
    res.send(token).status(200);
}

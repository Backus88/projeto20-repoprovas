import { Request, Response } from 'express';
import { checkIfEmailExists, createUser } from '../services/authServices';
import { userInsertType } from '../types/types';

export async function controlUser(req: Request, res: Response) {
    const { password, email } = req.body;
    const data: userInsertType = {
        email: email,
        password: password,
    };
    await checkIfEmailExists(data.email);
    await createUser(data);
    res.sendStatus(201);
}

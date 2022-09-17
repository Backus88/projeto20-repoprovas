import { insertUser, getUser } from '../repositories/authRepository';
import {
    notFoundError,
    notPossibleOperation,
    notValidEntrie,
} from '../utils/errorMessages';
import { userInsertType } from '../types/types';
import { cryptInfo, decryptInfo } from '../utils/bcryptInfo';
import generateJwtToken from '../utils/generateJwtToken';

export async function emailExists(email: string) {
    const data = await getUser(email);
    if (data) {
        throw notPossibleOperation('email already exists!!');
    }
    return;
}

export async function createUser(user: userInsertType) {
    user.password = await cryptInfo(user.password);
    await insertUser(user);
}

export async function emailNotExists(email: string) {
    const data = await getUser(email);
    if (data === null) {
        throw notFoundError('email doesnt exists!!');
    }
    return data;
}

export async function checkCredentials(dataPassword: string, password: string) {
    const validCredentials = await decryptInfo(password, dataPassword);
    if (!validCredentials) {
        throw notValidEntrie('email and password doesnt match!!');
    }
    return;
}

export async function generateToken(id: number) {
    return generateJwtToken(id);
}

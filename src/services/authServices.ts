import { insertUser, getUser } from '../repositories/authRepository';
import { notPossibleOperation } from '../utils/errorMessages';
import { userInsertType } from '../types/types';
import { cryptInfo } from '../utils/bcryptInfo';

export async function checkIfEmailExists(email: string) {
    const data = await getUser(email);
    if (data) {
        throw notPossibleOperation('email already exists!!');
    }
}

export async function createUser(user: userInsertType) {
    user.password = await cryptInfo(user.password);
    await insertUser(user);
}

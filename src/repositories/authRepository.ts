import { userInsertType } from '../types/types';
import client from '../config/database';

export async function insertUser(user: userInsertType) {
    await client.users.create({ data: user });
}

export async function getUser(email: string) {
    return await client.users.findUnique({
        where: {
            email: email,
        },
    });
}

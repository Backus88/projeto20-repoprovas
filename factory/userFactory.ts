import { faker } from '@faker-js/faker';
import { userInsertType } from '../src/types/types';

export const createUser: userInsertType = {
    email: faker.internet.email(),
    password: faker.internet.password(10),
};

export const emptyPassword: userInsertType = {
    email: faker.internet.email(),
    password: '',
};

export const emptyEmail: userInsertType = {
    email: '',
    password: faker.internet.password(10),
};

export const repeatedEmail: userInsertType = {
    email: 'oi@gmail.com',
    password: faker.internet.password(10),
};

export const invalidEmail: userInsertType = {
    email: faker.lorem.word(),
    password: faker.internet.password(10),
};

export const wrognObject = {
    url: faker.lorem.word(),
    name: faker.internet.password(10),
};

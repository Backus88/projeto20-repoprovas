import client from '../src/config/database';
import app from '../src/app';
import supertest from 'supertest';
import {
    createUser,
    emptyPassword,
    emptyEmail,
    repeatedEmail,
    invalidEmail,
    wrognObject,
} from '../factory/userFactory';

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "users";`;
});

describe('test route POST /register', () => {
    test('create new user', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const result = await supertest(app).post('/register').send(newUser);
        const createdUser = await client.users.findUnique({
            where: { email: user.email },
        });
        expect(result.statusCode).toBe(201);
        expect(createdUser).not.toBeNull();
    });
    test('create user with empty password', async () => {
        const user = emptyPassword;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const result = await supertest(app).post('/register').send(newUser);

        expect(result.statusCode).toBe(422);
    });
    test('create user with empty email', async () => {
        const user = emptyEmail;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const result = await supertest(app).post('/register').send(newUser);

        expect(result.statusCode).toBe(422);
    });
    test('create user where email already exists', async () => {
        const user = repeatedEmail;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        await supertest(app).post('/register').send(newUser);
        const result = await supertest(app).post('/register').send(newUser);

        expect(result.statusCode).toBe(409);
    });
    test('create user with invalid email', async () => {
        const user = invalidEmail;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const result = await supertest(app).post('/register').send(newUser);

        expect(result.statusCode).toBe(422);
    });
    test('create user with type of object', async () => {
        const user = wrognObject;
        const newUser = {
            url: user.url,
            name: user.name,
            confirmPassword: user.name,
        };
        const result = await supertest(app).post('/register').send(newUser);

        expect(result.statusCode).toBe(422);
        expect(result.body).toBeInstanceOf(Array);
    });
});

describe('test route POST /login', () => {
    test('successful login', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        await supertest(app).post('/register').send(newUser);
        const result = await supertest(app).post('/login').send(user);
        expect(result.statusCode).toBe(200);
    });

    test('user doenst exist', async () => {
        const user = createUser;
        const result = await supertest(app).post('/login').send(user);
        expect(result.statusCode).toBe(404);
    });

    test('invalid password', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        user.password = '1234';
        await supertest(app).post('/register').send(newUser);
        const result = await supertest(app).post('/login').send(user);
        expect(result.statusCode).toBe(403);
    });
    test('invalid type', async () => {
        const user = wrognObject;
        const result = await supertest(app).post('/login').send(user);
        expect(result.statusCode).toBe(422);
    });
});

afterAll(async () => {
    await client.$disconnect();
});

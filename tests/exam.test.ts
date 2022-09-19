import client from '../src/config/database';
import app from '../src/app';
import supertest from 'supertest';
import { createUser } from '../factory/userFactory';
import {
    createExam,
    invalidCategory,
    invalidTeacher,
    invalidDiscipline,
    emptyObject,
    doesntMatch,
} from '../factory/examFactory';

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "tests";`;
    await client.$executeRaw`TRUNCATE TABLE "users";`;
});

describe('test route POST /exam', () => {
    test('successful exam creation', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = createExam;
        await supertest(app).post('/register').send(newUser);
        const login = await supertest(app).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = await supertest(app)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(201);
    });

    test('not valid token', async () => {
        const exam = createExam;
        const token = `Bearer ajajajajajja`;
        const result = await supertest(app)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(401);
    });

    test('invalid category', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = invalidCategory;
        await supertest(app).post('/register').send(newUser);
        const login = await supertest(app).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = await supertest(app)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    });
    test('invalid teacher', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = invalidTeacher;
        await supertest(app).post('/register').send(newUser);
        const login = await supertest(app).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = await supertest(app)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    });

    test('invalid discipline', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = invalidDiscipline;
        await supertest(app).post('/register').send(newUser);
        const login = await supertest(app).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = await supertest(app)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    });

    test('teacher and discipline doesnt match', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = doesntMatch;
        await supertest(app).post('/register').send(newUser);
        const login = await supertest(app).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = await supertest(app)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    });

    test('wrong object type', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = createUser;
        await supertest(app).post('/register').send(newUser);
        const login = await supertest(app).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = await supertest(app)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(422);
    });

    test('empty object', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = emptyObject;
        await supertest(app).post('/register').send(newUser);
        const login = await supertest(app).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = await supertest(app)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(422);
    });
});

describe('test route GET /period', () => {
    test('successful exam creation', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        await supertest(app).post('/register').send(newUser);
        const login = await supertest(app).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = await supertest(app)
            .get('/period')
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBeNull();
    });

    test('not valid token', async () => {
        const token = `Bearer balblablabl`;
        const result = await supertest(app)
            .get('/period')
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(401);
    });

    test('no token', async () => {
        const result = await supertest(app).get('/period');
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    });
});

describe('test route GET /teacher', () => {
    test('successful exam creation', async () => {
        const user = createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        await supertest(app).post('/register').send(newUser);
        const login = await supertest(app).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = await supertest(app)
            .get('/teacher')
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBeNull();
    });

    test('not valid token', async () => {
        const token = `Bearer balblablabl`;
        const result = await supertest(app)
            .get('/teacher')
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(401);
    });

    test('no token', async () => {
        const result = await supertest(app).get('/teacher');
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    });
});

afterAll(async () => {
    await client.$disconnect();
});

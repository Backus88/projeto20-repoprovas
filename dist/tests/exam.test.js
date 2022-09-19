"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../src/config/database"));
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const userFactory_1 = require("../factory/userFactory");
const examFactory_1 = require("../factory/examFactory");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$executeRaw `TRUNCATE TABLE "tests";`;
    yield database_1.default.$executeRaw `TRUNCATE TABLE "users";`;
}));
describe('test route POST /exam', () => {
    test('successful exam creation', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = examFactory_1.createExam;
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const login = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(201);
    }));
    test('not valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const exam = examFactory_1.createExam;
        const token = `Bearer ajajajajajja`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(401);
    }));
    test('invalid category', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = examFactory_1.invalidCategory;
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const login = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    }));
    test('invalid teacher', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = examFactory_1.invalidTeacher;
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const login = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    }));
    test('successful exam creation', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = examFactory_1.invalidDiscipline;
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const login = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    }));
    test('wrong object type', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = userFactory_1.createUser;
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const login = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(422);
    }));
    test('wrong object type', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const exam = examFactory_1.emptyObject;
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const login = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .post('/exam')
            .send(exam)
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(422);
    }));
});
describe('test route GET /period', () => {
    test('successful exam creation', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const login = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .get('/period')
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBeNull();
    }));
    test('not valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = `Bearer balblablabl`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .get('/period')
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(401);
    }));
    test('no token', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/period');
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    }));
});
describe('test route GET /teacher', () => {
    test('successful exam creation', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const login = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        const token = `Bearer ${login.text}`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .get('/teacher')
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBeNull();
    }));
    test('not valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = `Bearer balblablabl`;
        const result = yield (0, supertest_1.default)(app_1.default)
            .get('/teacher')
            .set({ authorization: token });
        console.log(result.text);
        expect(result.statusCode).toBe(401);
    }));
    test('no token', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/teacher');
        console.log(result.text);
        expect(result.statusCode).toBe(404);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$disconnect();
}));

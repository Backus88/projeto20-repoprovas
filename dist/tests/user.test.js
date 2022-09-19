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
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$executeRaw `TRUNCATE TABLE "users";`;
}));
describe('test route POST /register', () => {
    test('create new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const result = yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const createdUser = yield database_1.default.users.findUnique({
            where: { email: user.email },
        });
        expect(result.statusCode).toBe(201);
        expect(createdUser).not.toBeNull();
    }));
    test('create user with empty password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.emptyPassword;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const result = yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        expect(result.statusCode).toBe(422);
    }));
    test('create user with empty email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.emptyEmail;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const result = yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        expect(result.statusCode).toBe(422);
    }));
    test('create user where email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.repeatedEmail;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const result = yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        expect(result.statusCode).toBe(409);
    }));
    test('create user with invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.invalidEmail;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        const result = yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        expect(result.statusCode).toBe(422);
    }));
    test('create user with type of object', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.wrognObject;
        const newUser = {
            url: user.url,
            name: user.name,
            confirmPassword: user.name,
        };
        const result = yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        expect(result.statusCode).toBe(422);
        expect(result.body).toBeInstanceOf(Array);
    }));
});
describe('test route POST /login', () => {
    test('successful login', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const result = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        expect(result.statusCode).toBe(200);
    }));
    test('user doenst exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const result = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        expect(result.statusCode).toBe(404);
    }));
    test('invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.createUser;
        const newUser = {
            email: user.email,
            password: user.password,
            confirmPassword: user.password,
        };
        user.password = '1234';
        yield (0, supertest_1.default)(app_1.default).post('/register').send(newUser);
        const result = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        expect(result.statusCode).toBe(403);
    }));
    test('invalid type', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userFactory_1.wrognObject;
        const result = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        expect(result.statusCode).toBe(422);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$disconnect();
}));

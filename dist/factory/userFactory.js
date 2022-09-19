"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrognObject = exports.invalidEmail = exports.repeatedEmail = exports.emptyEmail = exports.emptyPassword = exports.createUser = void 0;
const faker_1 = require("@faker-js/faker");
exports.createUser = {
    email: faker_1.faker.internet.email(),
    password: faker_1.faker.internet.password(10),
};
exports.emptyPassword = {
    email: faker_1.faker.internet.email(),
    password: '',
};
exports.emptyEmail = {
    email: '',
    password: faker_1.faker.internet.password(10),
};
exports.repeatedEmail = {
    email: 'oi@gmail.com',
    password: faker_1.faker.internet.password(10),
};
exports.invalidEmail = {
    email: faker_1.faker.lorem.word(),
    password: faker_1.faker.internet.password(10),
};
exports.wrognObject = {
    url: faker_1.faker.lorem.word(),
    name: faker_1.faker.internet.password(10),
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesntMatch = exports.emptyObject = exports.invalidDiscipline = exports.invalidTeacher = exports.invalidCategory = exports.createExam = void 0;
const faker_1 = require("@faker-js/faker");
exports.createExam = {
    name: faker_1.faker.lorem.word(),
    pdfUrl: faker_1.faker.internet.url(),
    category: 'Prática',
    discipline: 'React',
    teacher: 'Diego Pinho',
};
exports.invalidCategory = {
    name: faker_1.faker.lorem.word(),
    pdfUrl: faker_1.faker.internet.url(),
    category: 'Práticas',
    discipline: 'React',
    teacher: 'Diego Pinho',
};
exports.invalidTeacher = {
    name: faker_1.faker.lorem.word(),
    pdfUrl: faker_1.faker.internet.url(),
    category: 'Prática',
    discipline: 'React',
    teacher: 'Diego Amaral',
};
exports.invalidDiscipline = {
    name: faker_1.faker.lorem.word(),
    pdfUrl: faker_1.faker.internet.url(),
    category: 'Prática',
    discipline: 'Angular',
    teacher: 'Diego Pinho',
};
exports.emptyObject = {
    name: '',
    pdfUrl: '',
    category: '',
    discipline: '',
    teacher: '',
};
exports.doesntMatch = {
    name: faker_1.faker.lorem.word(),
    pdfUrl: faker_1.faker.internet.url(),
    category: 'Prática',
    discipline: 'React',
    teacher: 'Bruna Hamori',
};

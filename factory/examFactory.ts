import { faker } from '@faker-js/faker';
import { Body } from '../src/types/types';

export const createExam: Body = {
    name: faker.lorem.word(),
    pdfUrl: faker.internet.url(),
    category: 'Prática',
    discipline: 'React',
    teacher: 'Diego Pinho',
};

export const invalidCategory: Body = {
    name: faker.lorem.word(),
    pdfUrl: faker.internet.url(),
    category: 'Práticas',
    discipline: 'React',
    teacher: 'Diego Pinho',
};

export const invalidTeacher: Body = {
    name: faker.lorem.word(),
    pdfUrl: faker.internet.url(),
    category: 'Prática',
    discipline: 'React',
    teacher: 'Diego Amaral',
};

export const invalidDiscipline: Body = {
    name: faker.lorem.word(),
    pdfUrl: faker.internet.url(),
    category: 'Prática',
    discipline: 'Angular',
    teacher: 'Diego Pinho',
};

export const emptyObject: Body = {
    name: '',
    pdfUrl: '',
    category: '',
    discipline: '',
    teacher: '',
};

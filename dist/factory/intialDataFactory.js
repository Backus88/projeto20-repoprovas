"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teachersDisciplines = exports.disciplines = exports.teachers = exports.categories = exports.terms = void 0;
//intial terms
exports.terms = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
];
//intial categories types
exports.categories = [
    { name: 'Projeto' },
    { name: 'Prática' },
    { name: 'Recuperação' },
];
//intial teachers
exports.teachers = [{ name: 'Diego Pinho' }, { name: 'Bruna Hamori' }];
// intial disciplines
exports.disciplines = [
    { name: 'HTML e CSS', termId: 1 },
    { name: 'JavaScript', termId: 2 },
    { name: 'React', termId: 3 },
    { name: 'Humildade', termId: 1 },
    { name: 'Planejamento', termId: 2 },
    { name: 'Autoconfiança', termId: 3 },
];
// intial teachers and disciplines
exports.teachersDisciplines = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 1, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
    { teacherId: 2, disciplineId: 6 },
];

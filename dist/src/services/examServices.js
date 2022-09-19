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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsByTeacher = exports.getTestsByTerms = exports.createTest = exports.teacherAndDisciplineExists = exports.teacherExists = exports.disciplineExists = exports.categoryExists = void 0;
const examRepository_1 = require("../repositories/examRepository");
const errorMessages_1 = require("../utils/errorMessages");
function categoryExists(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, examRepository_1.findCategoryByName)(name);
        if (!data) {
            throw (0, errorMessages_1.notFoundError)('category doesnt exist!!');
        }
        return data;
    });
}
exports.categoryExists = categoryExists;
function disciplineExists(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, examRepository_1.findDisciplineByName)(name);
        if (!data) {
            throw (0, errorMessages_1.notFoundError)('discipline doesnt exist!!');
        }
        return data;
    });
}
exports.disciplineExists = disciplineExists;
function teacherExists(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, examRepository_1.findTeacherByName)(name);
        if (!data) {
            throw (0, errorMessages_1.notFoundError)('teacher doesnt exist!!');
        }
        return data;
    });
}
exports.teacherExists = teacherExists;
function teacherAndDisciplineExists(teacherId, disciplineId) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, examRepository_1.findByTeacherAndDiscipline)(teacherId, disciplineId);
        if (data.length === 0) {
            throw (0, errorMessages_1.notFoundError)('this teacher doesnt minister this discipline!!');
        }
        return data;
    });
}
exports.teacherAndDisciplineExists = teacherAndDisciplineExists;
function createTest(test) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, examRepository_1.insertTest)(test);
    });
}
exports.createTest = createTest;
function getTestsByTerms() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, examRepository_1.findAllTerms)();
        let id = null;
        let category;
        let tests;
        for (const v of data) {
            if (v.disciplines.length > 0) {
                for (const z of v.disciplines) {
                    id = z.teacherDiscipline[0].id;
                    category = z.teacherDiscipline[0].test;
                    if (z.teacherDiscipline[0].test.length > 0) {
                        for (let index = 0; index < category.length; index++) {
                            tests = category[index].category.tests;
                            for (let j = 0; j < tests.length; j++) {
                                tests[j].teacherName =
                                    tests[j].teacher.teacher.name;
                                delete tests[j].teacher;
                                if (id !== tests[j].teacherDisciplineId) {
                                    tests.splice(j, 1);
                                    j--;
                                }
                            }
                        }
                    }
                }
            }
        }
        return data;
    });
}
exports.getTestsByTerms = getTestsByTerms;
function getTestsByTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        let id = null;
        let desciplineName = null;
        const data = yield (0, examRepository_1.findByTeacher)();
        for (const v of data) {
            for (const z of v.teacherDiscipline) {
                id = z.id;
                desciplineName = z.discipline.name;
                delete z.discipline;
                if (z.test.length > 0) {
                    for (const y of z.test) {
                        for (let index = 0; index < y.category.tests.length; index++) {
                            y.category.tests[index].discipline = desciplineName;
                            if (id !== y.category.tests[index].teacherDisciplineId) {
                                y.category.tests.splice(index, 1);
                                index--;
                            }
                        }
                    }
                }
            }
        }
        return data;
    });
}
exports.getTestsByTeacher = getTestsByTeacher;

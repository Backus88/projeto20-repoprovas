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
exports.findByTeacher = exports.findByCategories = exports.findByTerms = exports.findAllTerms = exports.findByTeacherAndDiscipline = exports.findDisciplineByName = exports.findTeacherByName = exports.findTeacherById = exports.findCategoryById = exports.findCategoryByName = exports.insertTest = void 0;
const database_1 = __importDefault(require("../config/database"));
function insertTest(test) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.tests.create({ data: test });
    });
}
exports.insertTest = insertTest;
function findCategoryByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.categories.findUnique({
            where: {
                name: name,
            },
        });
    });
}
exports.findCategoryByName = findCategoryByName;
function findCategoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.categories.findUnique({
            where: {
                id: id,
            },
        });
    });
}
exports.findCategoryById = findCategoryById;
function findTeacherById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.teachers.findUnique({
            where: {
                id: id,
            },
        });
    });
}
exports.findTeacherById = findTeacherById;
function findTeacherByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.teachers.findUnique({
            where: {
                name: name,
            },
        });
    });
}
exports.findTeacherByName = findTeacherByName;
function findDisciplineByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.disciplines.findUnique({
            where: {
                name: name,
            },
        });
    });
}
exports.findDisciplineByName = findDisciplineByName;
function findByTeacherAndDiscipline(teacherId, disciplineId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.teacherDisciplines.findMany({
            where: {
                teacherId: teacherId,
                disciplineId: disciplineId,
            },
        });
    });
}
exports.findByTeacherAndDiscipline = findByTeacherAndDiscipline;
function findAllTerms() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.terms.findMany({
            select: {
                number: true,
                disciplines: {
                    select: {
                        name: true,
                        teacherDiscipline: {
                            select: {
                                id: true,
                                test: {
                                    distinct: ['categoryId'],
                                    select: {
                                        category: {
                                            select: {
                                                name: true,
                                                tests: {
                                                    select: {
                                                        name: true,
                                                        pdfUrl: true,
                                                        teacherDisciplineId: true,
                                                        teacher: {
                                                            select: {
                                                                teacher: {
                                                                    select: {
                                                                        name: true,
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    });
}
exports.findAllTerms = findAllTerms;
function findByTerms() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.terms.findMany({
            select: {
                number: true,
                disciplines: {
                    select: {
                        name: true,
                        teacherDiscipline: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
    });
}
exports.findByTerms = findByTerms;
function findByCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.categories.findMany({
            select: {
                name: true,
                tests: {
                    select: {
                        name: true,
                        pdfUrl: true,
                        teacherDisciplineId: true,
                    },
                },
            },
        });
    });
}
exports.findByCategories = findByCategories;
function findByTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.teachers.findMany({
            select: {
                name: true,
                teacherDiscipline: {
                    select: {
                        id: true,
                        discipline: {
                            select: {
                                name: true,
                            },
                        },
                        test: {
                            distinct: ['categoryId'],
                            select: {
                                category: {
                                    select: {
                                        name: true,
                                        tests: {
                                            select: {
                                                name: true,
                                                pdfUrl: true,
                                                teacherDisciplineId: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    });
}
exports.findByTeacher = findByTeacher;

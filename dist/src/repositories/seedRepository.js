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
exports.createTeachersDisciplines = exports.createDisciplines = exports.createTeachers = exports.createCategories = exports.createTerms = void 0;
const database_1 = __importDefault(require("../config/database"));
function createTerms(terms) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.terms.createMany({ data: terms });
    });
}
exports.createTerms = createTerms;
function createCategories(categories) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.categories.createMany({ data: categories });
    });
}
exports.createCategories = createCategories;
function createTeachers(teachers) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.teachers.createMany({ data: teachers });
    });
}
exports.createTeachers = createTeachers;
function createDisciplines(disciplines) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.disciplines.createMany({ data: disciplines });
    });
}
exports.createDisciplines = createDisciplines;
function createTeachersDisciplines(teachersDisciplines) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.teacherDisciplines.createMany({ data: teachersDisciplines });
    });
}
exports.createTeachersDisciplines = createTeachersDisciplines;

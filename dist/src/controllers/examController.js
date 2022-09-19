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
exports.controlExamsTeachers = exports.controlGetExams = exports.controlExamCreation = void 0;
const examServices_1 = require("../services/examServices");
function controlExamCreation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const exam = req.body;
        const category = yield (0, examServices_1.categoryExists)(exam.category);
        const discipline = yield (0, examServices_1.disciplineExists)(exam.discipline);
        const teacher = yield (0, examServices_1.teacherExists)(exam.teacher);
        const relation = yield (0, examServices_1.teacherAndDisciplineExists)(teacher.id, discipline.id);
        console.log(relation);
        const newExam = {
            name: exam.name,
            pdfUrl: exam.pdfUrl,
            categoryId: category.id,
            teacherDisciplineId: relation[0].id,
        };
        console.log(newExam);
        yield (0, examServices_1.createTest)(newExam);
        res.sendStatus(201);
        return;
    });
}
exports.controlExamCreation = controlExamCreation;
function controlGetExams(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, examServices_1.getTestsByTerms)();
        res.send(data).status(200);
    });
}
exports.controlGetExams = controlGetExams;
function controlExamsTeachers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, examServices_1.getTestsByTeacher)();
        res.send(data).status(200);
    });
}
exports.controlExamsTeachers = controlExamsTeachers;

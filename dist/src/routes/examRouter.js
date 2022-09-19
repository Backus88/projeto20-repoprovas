"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joiValidation_1 = __importDefault(require("../middlewares/joiValidation"));
const examController_1 = require("../controllers/examController");
const examSchema_1 = require("../schemas/examSchema");
const tokenValidation_1 = __importDefault(require("../middlewares/tokenValidation"));
const examRouter = (0, express_1.Router)();
examRouter.post('/exam', tokenValidation_1.default, (0, joiValidation_1.default)(examSchema_1.examSchema), examController_1.controlExamCreation);
examRouter.get('/period', tokenValidation_1.default, examController_1.controlGetExams);
examRouter.get('/teacher', tokenValidation_1.default, examController_1.controlExamsTeachers);
exports.default = examRouter;

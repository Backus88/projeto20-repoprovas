"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.examSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).max(64).required(),
    pdfUrl: joi_1.default
        .string()
        .regex(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/)
        .required(),
    category: joi_1.default.string().min(1).max(64).required(),
    discipline: joi_1.default.string().min(1).max(64).required(),
    teacher: joi_1.default.string().min(1).max(64).required(),
});

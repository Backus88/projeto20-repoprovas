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
exports.main = void 0;
const database_1 = __importDefault(require("../src/config/database"));
const intialDataFactory_1 = require("../factory/intialDataFactory");
const seedRepository_1 = require("../src/repositories/seedRepository");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.$executeRaw `TRUNCATE TABLE "tests", "categories","teachersDisciplines","teachers","disciplines","terms" RESTART IDENTITY`;
        yield (0, seedRepository_1.createTerms)(intialDataFactory_1.terms);
        yield (0, seedRepository_1.createCategories)(intialDataFactory_1.categories);
        yield (0, seedRepository_1.createTeachers)(intialDataFactory_1.teachers);
        yield (0, seedRepository_1.createDisciplines)(intialDataFactory_1.disciplines);
        yield (0, seedRepository_1.createTeachersDisciplines)(intialDataFactory_1.teachersDisciplines);
    });
}
exports.main = main;
main()
    .catch((e) => {
    console.log(e);
    process.exit(1);
})
    .finally(() => {
    database_1.default.$disconnect();
});

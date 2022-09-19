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
exports.generateToken = exports.checkCredentials = exports.emailNotExists = exports.createUser = exports.emailExists = void 0;
const authRepository_1 = require("../repositories/authRepository");
const errorMessages_1 = require("../utils/errorMessages");
const bcryptInfo_1 = require("../utils/bcryptInfo");
const generateJwtToken_1 = __importDefault(require("../utils/generateJwtToken"));
function emailExists(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, authRepository_1.getUser)(email);
        if (data) {
            throw (0, errorMessages_1.notPossibleOperation)('email already exists!!');
        }
        return;
    });
}
exports.emailExists = emailExists;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        user.password = yield (0, bcryptInfo_1.cryptInfo)(user.password);
        yield (0, authRepository_1.insertUser)(user);
    });
}
exports.createUser = createUser;
function emailNotExists(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, authRepository_1.getUser)(email);
        if (!data) {
            throw (0, errorMessages_1.notFoundError)('email doesnt exists!!');
        }
        return data;
    });
}
exports.emailNotExists = emailNotExists;
function checkCredentials(dataPassword, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const validCredentials = yield (0, bcryptInfo_1.decryptInfo)(password, dataPassword);
        if (!validCredentials) {
            throw (0, errorMessages_1.notValidEntrie)('email and password doesnt match!!');
        }
        return;
    });
}
exports.checkCredentials = checkCredentials;
function generateToken(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, generateJwtToken_1.default)(id);
    });
}
exports.generateToken = generateToken;

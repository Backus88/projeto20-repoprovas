"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMessages_1 = require("../utils/errorMessages");
dotenv_1.default.config();
function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace('Bearer ', '');
    if (!token || token === 'Bearer') {
        throw (0, errorMessages_1.notFoundError)('token');
    }
    const key = process.env.SECRET_KEY;
    if (!key) {
        throw (0, errorMessages_1.notFoundError)('key');
    }
    jsonwebtoken_1.default.verify(token, key, (err, payload) => {
        if (err) {
            throw (0, errorMessages_1.notAuthorized)('token');
        }
        res.locals = {
            payload: payload
        };
        return;
    });
    next();
}
exports.default = tokenValidation;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const joiValidation_1 = __importDefault(require("../middlewares/joiValidation"));
const registerSchema_1 = require("../schemas/registerSchema");
const loginSchema_1 = require("../schemas/loginSchema");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (0, joiValidation_1.default)(loginSchema_1.loginSchema), authController_1.controlLogin);
authRouter.post('/register', (0, joiValidation_1.default)(registerSchema_1.registerSchema), authController_1.controlUser);
exports.default = authRouter;

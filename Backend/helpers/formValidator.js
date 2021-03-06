"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTask = void 0;
const joi_1 = __importDefault(require("joi"));
exports.newTask = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    date: joi_1.default.string().required(),
    assignEmail: joi_1.default.string().email()
});

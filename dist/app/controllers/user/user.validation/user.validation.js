"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = exports.userRegisterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userRegisterValidation = joi_1.default.object().keys({
    name: joi_1.default.string().required().label('Name is required'),
    phone: joi_1.default.number().required().label('Phone number is required'),
    password: joi_1.default.string().required().label('Password is required'),
    isVerified: joi_1.default.boolean(),
});
exports.userLoginValidation = joi_1.default.object().keys({
    phone: joi_1.default.number().required().label('Phone number is required'),
    password: joi_1.default.string().required().label('Password is required'),
});
//# sourceMappingURL=user.validation.js.map
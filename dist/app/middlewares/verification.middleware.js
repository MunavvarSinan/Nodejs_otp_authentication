"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserIsVerified = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const checkUserIsVerified = (req, res, next) => {
    const userId = req.header('id');
    user_model_1.default.findById(userId).then((user) => {
        if ((user === null || user === void 0 ? void 0 : user.isVerified) === true) {
            next();
        }
        else {
            return res.status(402).json({
                success: false,
                msg: 'User is not verified',
            });
        }
    });
};
exports.checkUserIsVerified = checkUserIsVerified;
//# sourceMappingURL=verification.middleware.js.map
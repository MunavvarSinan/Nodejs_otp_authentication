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
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET;
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(402).json({
                    status: false,
                    message: 'token expired',
                });
            }
            const decode = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            req.token = decode;
            next();
        }
        catch (err) {
            res.status(401).send('Please authenticate');
        }
    }
    else {
        res.status(402).send('Token expired or not provided');
    }
});
exports.checkAuth = checkAuth;
//# sourceMappingURL=auth.middleware.js.map
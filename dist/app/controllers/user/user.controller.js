"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Logout = exports.Login = exports.verify = exports.Signup = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const bcryptjs_1 = __importStar(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const twilio_1 = require("../../services/twilio");
const twilio_2 = require("twilio");
const user_validation_1 = require("./user.validation/user.validation");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = new twilio_2.Twilio(accountSid, authToken);
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_validation_1.userRegisterValidation.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation Error ${result.error.details[0].message}`,
        });
        return;
    }
    const { name, phone, password } = req.body;
    yield user_model_1.default.findOne({ phone }).then((user) => {
        if (user) {
            res.status(402).json({
                success: false,
                msg: 'Phone number already registered',
            });
        }
        else {
            const hash = bcryptjs_1.default.hashSync(password, 10);
            const query = {
                name,
                phone,
                password: hash,
            };
            (0, twilio_1.sendOTP)(phone);
            user_model_1.default.create(query, (err, user) => {
                if (err)
                    throw err;
                res.json({
                    success: true,
                    userId: user._id,
                    msg: 'Verify User to continue',
                });
            });
        }
    });
});
exports.Signup = Signup;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, code } = req.body;
    client.verify.v2
        .services(serviceSid)
        .verificationChecks.create({
        to: `+91${phone}`,
        code: code,
    })
        .then((data) => {
        console.log(data);
        user_model_1.default.findOneAndUpdate({ phone }).then((user) => {
            if (user && user.isVerified === false) {
                if (!process.env.JWT_SECRET) {
                    throw new Error('Secret key is not provided');
                }
                user.isVerified = true;
                user.save();
                jsonwebtoken_1.default.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
                    if (err)
                        throw err;
                    res.json({
                        success: true,
                        token: 'Bearer ' + token,
                        name: user.name,
                        phone: user.phone,
                    });
                });
            }
            else {
                console.log('User not found');
            }
        });
    })
        .catch((Err) => {
        console.error('OTP is invalid or expired', Err);
    });
});
exports.verify = verify;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_validation_1.userLoginValidation.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation Error ${result.error.details[0].message}`,
        });
        return;
    }
    const { phone, password } = req.body;
    user_model_1.default.findOne({ phone }).then((user) => {
        if (!user) {
            return res.status(401).send({
                success: false,
                msg: "couldn't find the User",
            });
        }
        if (!(0, bcryptjs_1.compareSync)(password, user.password)) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect password',
            });
        }
        else {
            (0, twilio_1.sendOTP)(phone);
            return res.status(202).json({
                success: true,
                msg: 'Verify user to continue',
            });
        }
    });
});
exports.Login = Login;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.header('id');
    user_model_1.default.findByIdAndUpdate(userId).then((user) => {
        if (user) {
            user.isVerified = false;
            user.save();
            return res.status(200).json({
                success: false,
                msg: 'User Logout successfully',
            });
        }
    });
});
exports.Logout = Logout;
//# sourceMappingURL=user.controller.js.map
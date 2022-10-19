"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const verification_middleware_1 = require("../middlewares/verification.middleware");
const router = express_1.default.Router();
router.post('/register', user_controller_1.Signup);
router.post('/verify', user_controller_1.verify);
router.post('/login', user_controller_1.Login);
router.get('/protected', auth_middleware_1.checkAuth, verification_middleware_1.checkUserIsVerified, (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Authenticated successfully',
    });
});
router.post('/logout', auth_middleware_1.checkAuth, user_controller_1.Logout);
exports.default = router;
//# sourceMappingURL=user.routes.js.map
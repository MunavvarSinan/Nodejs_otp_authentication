"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const checkPermission = (permissions) => {
    return (req, res, next) => {
        const userRole = req.header('role');
        if (permissions.includes(userRole)) {
            next();
        }
        else {
            res.status(402).json({
                success: false,
                msg: `${userRole} dont have permission to access this route`,
            });
        }
    };
};
exports.checkPermission = checkPermission;
//# sourceMappingURL=permission.middleware.js.map
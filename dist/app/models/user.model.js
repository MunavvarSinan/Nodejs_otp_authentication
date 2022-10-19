"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
}, { timestamps: true });
UserSchema.statics.buildUser = (args) => {
    return new User(args);
};
const User = (0, mongoose_1.model)('user', UserSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map
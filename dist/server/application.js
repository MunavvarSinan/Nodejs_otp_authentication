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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const user_routes_1 = __importDefault(require("../app/routes/user.routes"));
class Application {
    constructor() {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, database_1.connect)();
            }
            catch (err) {
                console.error('📌 Could not connect to the database', err);
                throw Error(err);
            }
        });
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            this.app = (0, express_1.default)();
            this.app.use((0, cors_1.default)());
            try {
                this.app.use(express_1.default.json());
                this.app.get('/', (req, res) => res.json({
                    message: 'Welcome to Nodejs api authentication',
                }));
                this.app.use('/api/user', user_routes_1.default);
                const port = process.env.PORT || 4000;
                this.server = this.app.listen(port, () => {
                    console.log(`server started on localhost:${port}`);
                });
            }
            catch (error) {
                console.error('📌 Could not start server', error);
            }
        });
    }
}
exports.default = Application;
//# sourceMappingURL=application.js.map
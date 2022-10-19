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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const twilio_1 = require("twilio");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = new twilio_1.Twilio(accountSid, authToken);
const sendOTP = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    client.verify
        .services(serviceSid)
        .verifications.create({
        to: `+91${phone}`,
        channel: 'sms',
    })
        .then((response) => {
        return response;
    });
});
exports.sendOTP = sendOTP;
//# sourceMappingURL=twilio.js.map
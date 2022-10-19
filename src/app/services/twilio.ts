import { Twilio } from 'twilio';

const accountSid = process.env.ACCOUNT_SID as string;
const authToken = process.env.AUTH_TOKEN as string;
const serviceSid = process.env.TWILIO_SERVICE_SID as string;
const client = new Twilio(accountSid, authToken);

export const sendOTP = async (phone: number) => {
  client.verify
    .services(serviceSid)
    .verifications.create({
      to: `+91${phone}`,
      channel: 'sms',
    })
    .then((response) => {
      return response;
    });
};

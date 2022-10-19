import User from '../../models/user.model';
import {  Request, Response } from 'express';
import bcrypt, { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendOTP } from '../../services/twilio';
import { Twilio } from 'twilio';
import {
  userLoginValidation,
  userRegisterValidation,
} from './user.validation/user.validation';

const accountSid = process.env.ACCOUNT_SID as string;
const authToken = process.env.AUTH_TOKEN as string;
const serviceSid = process.env.TWILIO_SERVICE_SID as string;
const client = new Twilio(accountSid, authToken);

// @desc    Register new User and send verification otp
// @route   POST /api/user/signup
// @access  Private

export const Signup = async (req: Request, res: Response) => {
  const result = userRegisterValidation.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation Error ${result.error.details[0].message}`,
    });
    return;
  }
  const { name, phone, password } = req.body;
  await User.findOne({ phone }).then((user) => {
    if (user) {
      res.status(402).json({
        success: false,
        msg: 'Phone number already registered',
      });
    } else {
      const hash = bcrypt.hashSync(password, 10);

      const query = {
        name,
        phone,
        password: hash,
      };
      sendOTP(phone);
      User.create(query, (err, user) => {
        if (err) throw err;
        res.json({
          success: true,
          userId: user._id,
          msg: 'Verify User to continue',
        });
      });
    }
  });
};

/** This function verifies the otp and creates a jwt token for a user which expires in 7 days */
export const verify = async (req: Request, res: Response) => {
  const { phone, code } = req.body;
  client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({
      to: `+91${phone}`,
      code: code,
    })
    .then((data: any) => {
      console.log(data);
      User.findOneAndUpdate({ phone }).then((user) => {
        if (user && user.isVerified === false) {
          if (!process.env.JWT_SECRET) {
            throw new Error('Secret key is not provided');
          }
          user.isVerified = true;
          user.save();
          jwt.sign(
            user.toJSON(),
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: 'Bearer ' + token,
                name: user.name,
                phone: user.phone,
              });
            },
          );
          //   return res.status(202).json({
          //     success: true,
          //     msg: 'User Verified successfully ',
          //   });
        } else {
          console.log('User not found');
        }
      });
    })
    .catch((Err: any) => {
      console.error('OTP is invalid or expired', Err);
    });
};

// @desc    Authenticate User
// @route   POST /api/user/login
// @access  Public

export const Login = async (req: Request, res: Response) => {
  const result = userLoginValidation.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation Error ${result.error.details[0].message}`,
    });
    return;
  }
  const { phone, password } = req.body;
  User.findOne({ phone }).then((user) => {
    if (!user) {
      return res.status(401).send({
        success: false,
        msg: "couldn't find the User",
      });
    }
    if (!compareSync(password, user.password)) {
      return res.status(401).send({
        success: false,
        message: 'Incorrect password',
      });
    } else {
      sendOTP(phone);
      return res.status(202).json({
        success: true,
        msg: 'Verify user to continue',
      });
    }
  });
};

// @desc    Logout a user
// @route   POST /api/user/logout
// @access  Public

export const Logout = async (req: Request, res: Response) => {
  const userId = req.header('id') as string;
  User.findByIdAndUpdate(userId).then((user) => {
    if (user) {
      user.isVerified = false;
      user.save();
      return res.status(200).json({
        success: false,
        msg: 'User Logout successfully',
      });
    }
  });
};

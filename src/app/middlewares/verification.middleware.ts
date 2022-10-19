import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

export const checkUserIsVerified = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.header('id') as string;
  User.findById(userId).then((user) => {
    if (user?.isVerified === true) {
      next();
    } else {
      return res.status(402).json({
        success: false,
        msg: 'User is not verified',
      });
    }
  });
};

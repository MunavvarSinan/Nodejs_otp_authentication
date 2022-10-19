import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(402).json({
          status: false,
          message: 'token expired',
        });
      }
      const decode = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).token = decode;
      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
  } else {
    res.status(402).send('Token expired or not provided');
  }
};

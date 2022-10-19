import { Document, Model } from 'mongoose';

export interface IUser {
  name: string;
  phone: number;
  password: string;
  isVerified: boolean;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  buildUser(args: IUser): IUserDocument;
}

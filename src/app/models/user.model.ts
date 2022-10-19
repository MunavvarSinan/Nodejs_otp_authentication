import { Schema, model } from 'mongoose';
import { IUser, IUserDocument, IUserModel } from '../interfaces/user.interface';

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

UserSchema.statics.buildUser = (args: IUser) => {
  return new User(args);
};
const User = model<IUserDocument, IUserModel>('user', UserSchema);

export default User;

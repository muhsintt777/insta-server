import { ObjectId } from 'mongoose';

interface UserCreateAttributes {
  email: string;
  username: string;
  password: string;
  fullName: string;
  bio: string | null;
  profileImage: string | null;
  gender: number | null;
  mobileNo: string | null;
  refreshToken: string | null;
  updatedAt: string;
  createdAt: string;
}

interface User extends UserCreateAttributes {
  _id: ObjectId;
  __v: number;
}

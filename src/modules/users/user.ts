import { Document } from 'mongoose';

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  fullName: string;
  bio: string | null;
  profileImage: string | null;
  gender: number | null;
  mobileNo: string | null;
  refreshToken: string | null;
  createdAt: number;
  updatedAt: number;
};

export interface UserWithoutSensitive
  extends Document<
    unknown,
    {},
    { createdAt: NativeDate; updatedAt: NativeDate }
  > {
  email: string;
  username: string;
  fullName: string;
  bio: string | null;
  profileImage: string | null;
  gender: number | null;
  mobileNo: string | null;
}

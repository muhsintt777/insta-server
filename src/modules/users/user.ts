import { Document } from "mongoose";

export type TUser = {
  id: string;
  email: string;
  username: string;
  password: string;
  fullName: string;
  bio: string | null | undefined;
  profileImage: string | null | undefined;
  gender: number | null | undefined;
  mobileNo: string | null | undefined;
  refreshToken: string | null | undefined;
  createdAt: number;
  updatedAt: number;
};

export interface IUserWithoutSensitive
  extends Document<
    unknown,
    {},
    { createdAt: NativeDate; updatedAt: NativeDate }
  > {
  email: string;
  username: string;
  fullName: string;
  bio?: string | null | undefined;
  profileImage?: string | null | undefined;
  gender?: number | null | undefined;
  mobileNo?: string | null | undefined;
}

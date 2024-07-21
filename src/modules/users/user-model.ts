import { model, Schema, SchemaTypes } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    username: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    fullName: {
      type: SchemaTypes.String,
      required: true,
    },
    bio: {
      type: SchemaTypes.String,
    },
    profileImage: {
      type: SchemaTypes.String,
    },
    gender: {
      type: SchemaTypes.Decimal128,
    },
    mobileNo: {
      type: SchemaTypes.String,
    },
    refreshToken: {
      type: SchemaTypes.String,
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);

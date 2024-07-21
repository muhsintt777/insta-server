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
      optional: true,
    },
    profileImage: {
      type: SchemaTypes.String,
      optional: true,
    },
    gender: {
      type: SchemaTypes.Number,
      optional: true,
    },
    mobileNo: {
      type: SchemaTypes.String,
      optional: true,
    },
    refreshToken: {
      type: SchemaTypes.String,
      optional: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);

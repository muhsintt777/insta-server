import { model, Schema, SchemaTypes } from "mongoose";

const friendSchema = new Schema(
  {
    userId1: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    userId2: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const FriendModel = model("Friend", friendSchema);

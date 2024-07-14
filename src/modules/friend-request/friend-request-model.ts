import { model, Schema, SchemaTypes } from "mongoose";

const friendRequestSchema = new Schema(
  {
    senderId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: SchemaTypes.Decimal128,
      default: 1,
    },
  },
  { timestamps: true }
);

export const FriendRequestModel = model("Friend_Request", friendRequestSchema);

import { model, Schema, SchemaTypes } from "mongoose";

const likeSchema = new Schema(
  {
    postId: {
      type: SchemaTypes.ObjectId,
      ref: "Post",
      required: true,
    },
    likedBy: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const LikeModel = model("Like", likeSchema);

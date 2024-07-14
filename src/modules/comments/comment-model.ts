import { model, Schema, SchemaTypes } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: SchemaTypes.String,
      required: true,
    },
    creator: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: SchemaTypes.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentModel = model("Comment", commentSchema);

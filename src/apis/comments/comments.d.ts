import { ObjectId } from 'mongoose';

interface CommentCreateAttributes {
  content: string;
  creator: ObjectId;
  postId: ObjectId;
  updatedAt: string;
  createdAt: string;
}

interface Comment extends CommentCreateAttributes {
  _id: ObjectId;
  __v: number;
}

import { ObjectId } from 'mongoose';

interface LikeCreateAttributes {
  postId: ObjectId;
  likedBy: ObjectId;
  updatedAt: string;
  createdAt: string;
}

interface Like extends LikeCreateAttributes {
  _id: ObjectId;
  __v: number;
}

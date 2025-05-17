import { ObjectId } from 'mongoose';

interface PostCreateAttributes {
  image: string;
  caption: string;
  creator: ObjectId;
  likeCount: number;
  commentCount: number;
  updatedAt: string;
  createdAt: string;
}

interface Post extends PostCreateAttributes {
  _id: ObjectId;
  __v: number;
}

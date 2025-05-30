import { ObjectId } from 'mongoose';

interface FriendCreateAttributes {
  userId1: ObjectId;
  userId2: ObjectId;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  updatedAt: string;
  createdAt: string;
}

interface Friend extends FriendCreateAttributes {
  _id: ObjectId;
  __v: number;
}

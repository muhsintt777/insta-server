import { model, Schema, SchemaTypes } from 'mongoose';
import { getCommonJsonTransformConfig } from 'utils/common';
import { FriendCreateAttributes } from './friend';

const friendSchema = new Schema<FriendCreateAttributes>(
  {
    userId1: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    userId2: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: SchemaTypes.String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
      default: 'PENDING',
    },
  },
  { timestamps: true, toJSON: getCommonJsonTransformConfig() },
);

export const FriendModel = model('Friend', friendSchema);

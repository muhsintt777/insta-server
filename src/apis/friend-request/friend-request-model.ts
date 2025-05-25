import { model, Schema, SchemaTypes } from 'mongoose';
import { getCommonJsonTransformConfig } from 'utils/common';

const friendRequestSchema = new Schema(
  {
    senderId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: SchemaTypes.Decimal128,
      default: 1,
    },
  },
  { timestamps: true, toJSON: getCommonJsonTransformConfig() },
);

export const FriendRequestModel = model('Friend_Request', friendRequestSchema);

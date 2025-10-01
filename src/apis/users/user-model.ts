import { model, Schema, SchemaTypes } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { Crypto } from 'utils/crypto';
import { UserCreateAttributes } from './user';
import { getCommonJsonTransformConfig } from 'utils/common';

const userSchema = new Schema<UserCreateAttributes>(
  {
    email: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    username: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    fullName: {
      type: SchemaTypes.String,
      required: true,
    },
    bio: {
      type: SchemaTypes.String,
      default: '',
    },
    profileImage: {
      type: SchemaTypes.String,
      default: null,
    },
    gender: {
      type: SchemaTypes.Number,
      default: null,
    },
    mobileNo: {
      type: SchemaTypes.String,
      default: null,
    },
    postCount: {
      type: SchemaTypes.Number,
      default: 0,
    },
    friendsCount: {
      type: SchemaTypes.Number,
      default: 0,
    },
    refreshToken: {
      type: SchemaTypes.String,
      default: null,
    },
  },
  {
    timestamps: true,

    // calling .lean() on document will cause issues with this config!!
    toJSON: getCommonJsonTransformConfig((_doc: any, ret: any) => {
      delete ret.password;
      delete ret.refreshToken;
    }),
  },
);

userSchema.plugin(mongooseAggregatePaginate);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await Crypto.hashString(this.password);
  next();
});

export const UserModel = model('User', userSchema);

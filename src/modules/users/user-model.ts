import { model, Schema, SchemaTypes } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { Crypto } from 'utils/crypto';
import { User } from './user';

const userSchema = new Schema<User>(
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
      required: true,
      default: null,
    },
    profileImage: {
      type: SchemaTypes.String,
      required: true,
      default: null,
    },
    gender: {
      type: SchemaTypes.Number,
      required: true,
      default: null,
    },
    mobileNo: {
      type: SchemaTypes.String,
      required: true,
    },
    refreshToken: {
      type: SchemaTypes.String,
      default: null,
    },
  },
  { timestamps: true },
);

userSchema.plugin(mongooseAggregatePaginate);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await Crypto.hashString(this.password);
  next();
});

export const UserModel = model('User', userSchema);

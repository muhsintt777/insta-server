import { model, Schema, SchemaTypes } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { Crypto } from 'utils/crypto';

const userSchema = new Schema(
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
      optional: true,
    },
    profileImage: {
      type: SchemaTypes.String,
      optional: true,
    },
    gender: {
      type: SchemaTypes.Number,
      optional: true,
    },
    mobileNo: {
      type: SchemaTypes.String,
      optional: true,
    },
    refreshToken: {
      type: SchemaTypes.String,
      optional: true,
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

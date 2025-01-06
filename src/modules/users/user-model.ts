import { model, Schema, SchemaTypes } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { Crypto } from 'utils/crypto';

interface Attributes {
  email: string;
  username: string;
  password: string;
  fullName: string;
  bio: string | null;
  profileImage: string | null;
  gender: number | null;
  mobileNo: string | null;
  refreshToken: string | null;
  updatedAt: string;
  createdAt: string;
}

const userSchema = new Schema<Attributes>(
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
  {
    timestamps: true,

    // calling .lean() on document will cause issues with this config!!
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

userSchema.plugin(mongooseAggregatePaginate);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await Crypto.hashString(this.password);
  next();
});

export const UserModel = model('User', userSchema);

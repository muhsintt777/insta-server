import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { Crypto } from 'utils/crypto';

interface CustomDocument extends Document {
  email: string;
  username: string;
  password: string;
  fullName: string;
  bio: string | null;
  profileImage: string | null;
  gender: number | null;
  mobileNo: string | null;
  refreshToken: string | null;
}

const userSchema = new Schema<CustomDocument>(
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

interface ModelAttributes {
  email: string;
  username: string;
  password: string;
  fullName: string;
  bio: string | null;
  profileImage: string | null;
  gender: number | null;
  mobileNo: string | null;
  refreshToken: string | null;
}

interface CustomModel extends Model<CustomDocument> {
  build(attributes: ModelAttributes): CustomDocument;
}

export const UserModel = model<CustomDocument, CustomModel>('User', userSchema);

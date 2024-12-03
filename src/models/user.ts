import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  hash: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    hash: String,
  },
  { timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" } }
);

const User: Model<IUser> = mongoose.model<IUser>("users", UserSchema);

export default User;

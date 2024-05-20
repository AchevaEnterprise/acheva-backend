import { Document, Schema, model, Types } from "mongoose";
import { User } from "./accounts/userModel";

export interface Token extends Document {
  token: string;
  userId: Types.ObjectId | User;
  createdAt: Date;
  otp: number;
  otpSentTime: Date;
}

const tokenSchema = new Schema<Token>({
  token: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: Number,
    default: 0,
  },
  otpSentTime: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

export default model<Token>("Token", tokenSchema);

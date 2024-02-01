import { Document, Schema, model, Types } from "mongoose";
import { User } from "./accounts/userModel";

export interface Token extends Document {
  token: string;
  userId: Types.ObjectId | User;
  createdAt: Date;
}

const tokenSchema = new Schema<Token>({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

export default model<Token>("Token", tokenSchema);

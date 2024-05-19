import { Document, Schema, model } from "mongoose";

export interface User extends Document {
  fullname: string;
  email: string;
  password: string;
  department: string;
  registrationNumber: number;
  level: string;
  courseAdviserId: Schema.Types.ObjectId;
  accountType: Schema.Types.ObjectId;
}

const userSchema = new Schema<User>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    registrationNumber: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    courseAdviserId: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
    },
    accountType: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

// Create and export the User model
export default model<User>("User", userSchema);

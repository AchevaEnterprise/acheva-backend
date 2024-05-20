import { Document, Schema, model } from "mongoose";
import { InstructorRole } from "../../common/enums/instructor.enum";

export interface Instructor extends Document {
  fullname: string;
  email: string;
  password: string;
  department: string;
  role: InstructorRole;
  isVerified: boolean;
}

const instructorSchema = new Schema<Instructor>(
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
    isVerified: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: InstructorRole,
      default: InstructorRole.COURSE_ADVISER,
    },
  },
  { timestamps: true }
);

// Create and export the Instructor model
export default model<Instructor>("Instructor", instructorSchema);

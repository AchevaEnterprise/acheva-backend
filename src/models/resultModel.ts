import { Document, Schema, model } from "mongoose";

export interface Result extends Document {
  courseId: Schema.Types.ObjectId;
  studentName: string;
  registrationNumber: string;
  testScore: number;
  practicalScore: number;
  continuousAssessment: number;
  examScore: number;
  total: number;
  grade: string;
  createdBy: Schema.Types.ObjectId;
}

const resultSchema = new Schema<Result>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
    },
    studentName: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    testScore: {
      type: Number,
    },
    practicalScore: {
      type: Number,
      required: true,
    },
    continuousAssessment: {
      type: Number,
      required: true,
    },
    examScore: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<Result>("Result", resultSchema);

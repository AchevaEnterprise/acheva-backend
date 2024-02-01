import { Document, Schema, model } from "mongoose";

export interface Course extends Document {
  title: string;
  unitLoad: string;
  code: string;
  session: string;
  results: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  hasPublishedResults: boolean;
  publishedBy: Schema.Types.ObjectId;
}

const courseSchema = new Schema<Course>(
  {
    title: {
      type: String,
      required: true,
    },
    unitLoad: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
    },
    hasPublishedResults: {
      type: Boolean,
      default: false,
    },
    publishedBy: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
    },
    results: [
      {
        type: Schema.Types.ObjectId,
        ref: "Result",
      },
    ],
  },
  { timestamps: true }
);

export default model<Course>("Course", courseSchema);

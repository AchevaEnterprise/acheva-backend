import express from "express";
export const courseRoute = express.Router();

import {
  getCourse,
  getCourseResults,
  getCourseResultInCSV,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import { auth } from "../auth/auth";

courseRoute.get("/", getCourses);
courseRoute.get("/get/:id", auth, getCourse);
courseRoute.get("/results/:id", auth, getCourseResults);
courseRoute.get("/results-in-csv/:id", auth, getCourseResultInCSV);
courseRoute.post("/", auth, addCourse);
courseRoute.patch("/:id", auth, updateCourse);
courseRoute.delete("/:id", auth, deleteCourse);

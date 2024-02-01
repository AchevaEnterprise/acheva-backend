import express from "express";
export const instructorRoute = express.Router();

import {
  getInstructor,
  getInstructors,
  updateInstructor,
  deleteInstructor,
} from "../controllers/instructorController";
import { auth, tokenIsValid } from "../auth/auth";
import { login, register } from "../auth/instructor";

instructorRoute.post("/register", register);
instructorRoute.post("/login", login);
instructorRoute.post("/validateToken", tokenIsValid);

instructorRoute.get("/", getInstructors);
instructorRoute.get("/:id", auth, getInstructor);
instructorRoute.patch("/:id", auth, updateInstructor);
instructorRoute.delete("/:id", auth, deleteInstructor);

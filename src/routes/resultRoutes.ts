import express from "express";
export const resultRoute = express.Router();

import {
  getResult,
  getResults,
  addResult,
  updateResult,
  deleteResult,
} from "../controllers/resultController";
import { auth } from "../auth/auth";

resultRoute.get("/", getResults);
resultRoute.get("/:id", auth, getResult);
resultRoute.post("/", auth, addResult);
resultRoute.patch("/:id", auth, updateResult);
resultRoute.delete("/:id", auth, deleteResult);

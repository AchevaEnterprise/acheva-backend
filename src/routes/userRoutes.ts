import express from "express";
export const userRoute = express.Router();

import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { auth, tokenIsValid } from "../auth/auth";
import { login, register } from "../auth/user";

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/validateToken", tokenIsValid);

userRoute.get("/", getUsers);
userRoute.get("/:id", auth, getUser);
userRoute.patch("/:id", auth, updateUser);
userRoute.delete("/:id", auth, deleteUser);

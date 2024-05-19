import express from "express";
export const resultRoute = express.Router();
import fs from "fs";

if (process.env.MODE == "production") {
  const filePath = "/opt/render/project/src/build/src/controllers/uploads";

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
    console.log(`Directory created: ${filePath}`);
  }
}

import {
  getResult,
  getResults,
  addResult,
  addResultfromCsv,
  updateResult,
  deleteResult,
} from "../controllers/resultController";
import { auth } from "../auth/auth";
import { upload } from "../common/helpers/uploadHelper";

resultRoute.get("/", getResults);
resultRoute.get("/:id", auth, getResult);
resultRoute.post("/", auth, addResult);
resultRoute.post(
  "/upload-result",
  auth,
  upload.single("result"),
  addResultfromCsv
);
resultRoute.patch("/:id", auth, updateResult);
resultRoute.delete("/:id", auth, deleteResult);

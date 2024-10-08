import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db";

connectDB();
const app: Application = express();
const port = process.env.PORT || 6000;
const mode = process.env.MODE;

app.use(cors());
app.use(express.json());

import { userRoute } from "./routes/userRoutes";
import { instructorRoute } from "./routes/instructorRoutes";
import { courseRoute } from "./routes/courseRoutes";
import { resultRoute } from "./routes/resultRoutes";

app.use("/api/users", userRoute);
app.use("/api/instructors", instructorRoute);
app.use("/api/courses", courseRoute);
app.use("/api/results", resultRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Acheva Server is Live!");
});

app.listen(port, () => {
  console.log(`RMS portal server is running on ${mode} mode at port ${port}`);
});

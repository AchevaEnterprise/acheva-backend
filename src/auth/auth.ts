import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/accounts/userModel";
const secretKey: any = process.env.SECRET;

const auth = (req: any, res: Response, next: any) => {
  const token: string = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ msg: "No authenication token, authorization denied" });

  const verfied: any = jwt.verify(token, secretKey);
  if (!verfied)
    return res
      .status(401)
      .json({ msg: "Token verification failed, authorization denied" });

  req.user = verfied.id;
  next();
};

const tokenIsValid = async (req: Request, res: Response) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified: any = jwt.verify(token, secretKey);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

export { auth, tokenIsValid };

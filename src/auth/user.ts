import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/accounts/userModel";

const secretKey: any = process.env.SECRET;

const register = async (req: Request, res: Response) => {
  const {
    fullname,
    email,
    password,
    confirmPassword,
    department,
    registrationNumber,
    level,
    courseAdviser,
    accountType,
  } = req.body;
  const salt = await bcrypt.genSalt();

  if (password !== confirmPassword)
    return res.status(400).send({
      data: {},
      message: "Password and password confirmation should match",
      status: 1,
    });
  bcrypt.hash(password, salt, async (err, hash) => {
    if (err) {
      res.status(400).send({
        data: {},
        message: err,
        status: 1,
      });
    } else {
      const existingUser = await User.findOne({
        email: email,
      });
      if (existingUser) {
        return res.status(400).json({
          data: {},
          message: "Email already exists",
          status: 1,
        });
      }
      const user = new User({
        fullname,
        email,
        department,
        registrationNumber,
        password: hash,
        level,
        courseAdviser,
        accountType,
      });
      const savedUser = await user.save();

      res.status(201).send({
        data: savedUser,
        message: "User registered successfully",
        status: 0,
      });
    }
  });
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).send({
        data: {},
        message: `${email} not found!`,
        status: 1,
      });
    } else if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send({
            data: {},
            message: err,
            status: 1,
          });
        } else if (!result) {
          res.status(401).send({
            data: {},
            message: "Email or password is incorrect",
            status: 1,
          });
        } else {
          const token = jwt.sign({ id: user._id }, secretKey);
          // const savedToken = new Token({
          //   userId: user._id,
          //   token,
          // });
          // savedToken.save();
          res.status(200).send({
            data: {
              token,
              id: user._id,
              email: user.email,
            },
            message: "Logged in successfully",
            status: 0,
          });
        }
      });
    }
  } catch (err: any) {
    res.status(500).send({
      data: {},
      error: err.message,
      sataus: 1,
    });
  }
};

export { register, login };

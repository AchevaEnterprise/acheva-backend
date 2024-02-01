import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Instructor from "../models/accounts/instructorModel";
import { validateEmail } from "../common/helpers/validateEmailHelper";

const secretKey: any = process.env.SECRET;

const register = async (req: Request, res: Response) => {
  const { fullname, email, password, confirmPassword, department, role } =
    req.body;
  const salt = await bcrypt.genSalt();

  const isFutoEmail = await validateEmail(email);
  if (!isFutoEmail)
    return res.status(400).send({
      data: {},
      message: "Email must end with @futo.edu.ng",
      status: 1,
    });

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
      const existingInstructor = await Instructor.findOne({
        email: email,
      });
      if (existingInstructor) {
        return res.status(400).json({
          data: {},
          message: "Email already exists",
          status: 1,
        });
      }
      const instructor = new Instructor({
        fullname,
        email,
        password: hash,
        department,
        role,
      });
      const savedInstructor = await instructor.save();

      res.status(201).send({
        data: savedInstructor,
        message: "Instructor registered successfully",
        status: 0,
      });
    }
  });
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const isFutoEmail = await validateEmail(email);
    if (!isFutoEmail)
      return res.status(400).send({
        data: {},
        message: "Email must end with @futo.edu.ng",
        status: 1,
      });
    const instructor = await Instructor.findOne({ email: email });
    if (!instructor) {
      res.status(401).send({
        data: {},
        message: `${email} not found!`,
        status: 1,
      });
    } else if (instructor) {
      bcrypt.compare(password, instructor.password, (err, result) => {
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
          const token = jwt.sign({ id: instructor._id }, secretKey);

          res.status(200).send({
            data: {
              token,
              id: instructor._id,
              email: instructor.email,
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

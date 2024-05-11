import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import User from "../models/accounts/userModel";
import Token from "../models/tokenModel";
import { sendMail } from "../common/helpers/mailHelper";
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

const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    let { email } = req.body;

    const user: any = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        data: {},
        message: `User with ${email} not found!`,
        status: 1,
      });
    }

    let token = await Token.findOne({
      userId: user._id,
    });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomUUID().toString();

    const hash = await bcrypt.hash(resetToken, Number(10));

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `acheva.com/forgotpassword?token=${resetToken}&id=${user._id}`;

    await sendMail(
      user.email,
      "Password Reset Request",
      { name: user.firstName, link: link },
      "../templates/requestResetPassword.handlebars"
    );
    res.status(200).send({
      data: {
        token: token,
        userId: user._id,
        link: link,
      },
      message: "Reset Password link sent successfully",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    let { userId, token, password } = req.body;
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) {
      throw new Error("Invalid or Expired password reset token");
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (isValid) {
      throw new Error("Invalid or Expired password reset token");
    }

    const hash = await bcrypt.hash(password, Number(10));
    await User.updateOne({ _id: userId }, { password: hash });

    const user: any = await User.findById({
      _id: userId,
    });

    sendMail(
      user.email,
      "Password Reset Successfully",
      { name: user.firstName },
      "../helpers/template/resetPassword.handlebars"
    );
    await passwordResetToken.deleteOne();
    res.status(200).send({
      data: {
        _id: userId,
        password: hash,
      },
      message: "Password Reset successfully",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

export { auth, tokenIsValid, requestPasswordReset, resetPassword };

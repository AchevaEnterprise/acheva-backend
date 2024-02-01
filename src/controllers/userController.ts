import { Request, Response } from "express";
import User from "../models/accounts/userModel";

const getUser = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const user: any = await User.findById(id);

    res.status(200).send({
      data: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        department: user.department,
        registrationNumber: user.registrationNumber,
        level: user.level,
        courseAdviser: user.courseAdviser,
        accountType: user.accountType,
        role: user.role,
      },
      message: "User Details",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      data: users,
      message: "Users",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const updateUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    if (id !== userId)
      return res
        .status(401)
        .send({ data: {}, message: "Unauthorized User!", status: 1 });

    const updatedUser = await User.findByIdAndUpdate(id, req.body);

    res
      .status(201)
      .send({ data: updatedUser, message: "User Updated", status: 0 });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

const deleteUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    if (id !== userId)
      return res
        .status(401)
        .send({ data: {}, message: "Unauthorized User!", status: 1 });

    const user = await User.findOne({
      _id: id,
    });
    if (!user)
      return res.status(401).send({
        data: {},
        message: "User does not exist!",
        status: 1,
      });

    await User.findByIdAndDelete(id);
    res.status(201).send({ message: "User Deleted", status: 0 });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

export { getUser, getUsers, updateUser, deleteUser };

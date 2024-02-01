import { Request, Response } from "express";
import Instructor from "../models/accounts/instructorModel";

const getInstructor = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const instructor: any = await Instructor.findById(id);

    res.status(200).send({
      data: {
        id: instructor._id,
        email: instructor.email,
        fullname: instructor.fullname,
        department: instructor.department,
        role: instructor.role,
      },
      message: "Instructor Details",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const getInstructors = async (req: Request, res: Response) => {
  try {
    const instructors = await Instructor.find({});
    res.status(200).send({
      data: instructors,
      message: "Instructors",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const updateInstructor = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const instructorId = req.user;

    if (id !== instructorId)
      return res
        .status(401)
        .send({ data: {}, message: "Unauthorized Instructor!", status: 1 });

    const updatedInstructor = await Instructor.findByIdAndUpdate(id, req.body);

    res.status(201).send({
      data: updatedInstructor,
      message: "Instructor Updated",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

const deleteInstructor = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const instructorId = req.user;

    if (id !== instructorId)
      return res
        .status(401)
        .send({ data: {}, message: "Unauthorized Instructor!", status: 1 });

    const instructor = await Instructor.findOne({
      _id: id,
    });
    if (!instructor)
      return res.status(401).send({
        data: {},
        message: "Instructor does not exist!",
        status: 1,
      });

    await Instructor.findByIdAndDelete(id);
    res.status(201).send({ message: "Instructor Deleted", status: 0 });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

export { getInstructor, getInstructors, updateInstructor, deleteInstructor };

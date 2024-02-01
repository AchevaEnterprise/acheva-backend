import { Request, Response } from "express";
import Course from "../models/courseModel";
import Result from "../models/resultModel";

const getCourse = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const course: any = await Course.findById(id);

    res.status(200).send({
      data: course,
      message: "Course Details",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({});
    res.status(200).send({
      data: courses,
      message: "Courses",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const getCourseResults = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const results = await Result.find({
      courseId: id,
    });
    res.status(200).send({
      data: results,
      message: "Results",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const addCourse = async (req: any, res: Response) => {
  try {
    const createdBy = req.user;
    const { title, unitLoad, code, session } = req.body;

    const newCourse = new Course({
      title,
      unitLoad,
      code,
      session,
      createdBy,
    });
    await newCourse.save();

    return res.status(201).send({
      message: "Course added successfully!",
      data: newCourse,
      status: 0,
    });
  } catch (err) {
    return res.status(400).send({
      message: err,
      data: {},
      status: 1,
    });
  }
};

const updateCourse = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body);

    res
      .status(201)
      .send({ data: updatedCourse, message: "Course Updated", status: 0 });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

const deleteCourse = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({
      _id: id,
    });
    if (!Course)
      return res.status(401).send({
        data: {},
        message: "Course does not exist!",
        status: 1,
      });

    await Course.findByIdAndDelete(id);
    res.status(204).send({ message: "Course Deleted", status: 0 });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

export {
  getCourse,
  getCourseResults,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};

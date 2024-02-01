import { Request, Response } from "express";
import Result from "../models/resultModel";
import Course from "../models/courseModel";

const getResult = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const result: any = await Result.findById(id);

    res.status(200).send({
      data: result,
      message: "Result Details",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const getResults = async (req: Request, res: Response) => {
  try {
    const results = await Result.find({});
    res.status(200).send({
      data: results,
      message: "Results",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const addResult = async (req: any, res: Response) => {
  try {
    const createdBy = req.user;
    const {
      courseId,
      studentName,
      registrationNumber,
      testScore,
      practicalScore,
      continuousAssessment,
      examScore,
      total,
      grade,
    } = req.body;

    const newResult = new Result({
      courseId,
      studentName,
      registrationNumber,
      testScore,
      practicalScore,
      continuousAssessment,
      examScore,
      total,
      grade,
      createdBy,
    });
    await newResult.save();
    await Course.findByIdAndUpdate(courseId, {
      $push: {
        results: newResult,
      },
    });

    return res.status(201).send({
      message: "Result added successfully!",
      data: newResult,
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

const updateResult = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const updatedResult = await Result.findByIdAndUpdate(id, req.body);

    res
      .status(201)
      .send({ data: updatedResult, message: "Result Updated", status: 0 });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

const deleteResult = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const result = await Result.findOne({
      _id: id,
    });
    const course = result?.courseId;
    const courseId = course?.valueOf();
    if (!result)
      return res.status(401).send({
        data: {},
        message: "Result does not exist!",
        status: 1,
      });
    await Result.findByIdAndDelete(id);
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        results: id,
      },
    });
    res.status(204).send({ message: "Result Deleted", status: 0 });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

export { getResult, getResults, addResult, updateResult, deleteResult };

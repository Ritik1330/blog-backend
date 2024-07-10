import { Request, Response, NextFunction } from "express";
import { Tag } from "../models/tagModel";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import { TagType } from "../types/types";

export const newTag = TryCatch(
  async (req: Request<any, {}, TagType>, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!name) {
      next(new ErrorHandler("Please add Required fileds", 400));
    }
    let tag = await Tag.findOne({ name: name });
    if (tag) {
      return res.status(403).json({
        success: false,
        message: `Tag ${tag.name}'s already exists in system. please change Tag and try.`,
        status: 403,
      });
    }

    const tagCount = await Tag.countDocuments();
    tag = await Tag.create({
      _id: tagCount,
      name,
    });

    return res.status(201).json({
      success: true,
      message: `Tag ${tag.name} has been created`,
    });
  }
);

export const getAllTags = TryCatch(async (req, res, next) => {
  const tags = await Tag.find({}).sort("-_id");
  return res.status(200).json({
    success: true,
    tags,
  });
});

export const getTagDetails = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;

  const tag = await Tag.findById(id);

  if (!tag) return next(new ErrorHandler("Invalid Tag id", 400));

  return res.status(200).json({
    success: true,
    tag,
  });
});
export const deleteTag = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;
  const tag = await Tag.findById(id);
  if (!tag) return next(new ErrorHandler("Invalid Tag id", 400));
  await tag.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Tag Deleted Succesfully",
  });
});

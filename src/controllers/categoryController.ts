import { Request, Response, NextFunction } from "express";
import { Category } from "../models/categoryModel";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import { CategoryType } from "../types/types";
import { User } from "../models/User";
export const newCategory = TryCatch(
  async (
    req: Request<any, {}, CategoryType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      name,
      slug,
      visibility,
      showInHierarchy,
      description,
      sectionType,
      tags,
      createdBy,
    } = req.body;

    let category = await Category.findById({ _id: slug });
    if (category) {
      res.status(403).json({
        success: false,
        message: `Category ${category.name} already exists in system. please change slug or Name and try.`,
        status: 403,
      });
    }
    if (!name || !slug) {
      next(new ErrorHandler("Please add Required fileds", 400));
    }
    category = await Category.create({
      _id: slug,
      name,
      slug,
      visibility,
      showInHierarchy,
      description,
      sectionType,
      tags,
      createdBy,
    });

    return res.status(201).json({
      success: true,
      message: `Category ${category.name} has been created`,
    });
  }
);

export const getAllCategory = TryCatch(async (req, res, next) => {
  const categorys = await Category.find({});

  return res.status(200).json({
    success: true,
    categorys,
  });
});

export const getCategoryDetails = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;

  const category = await Category.findById(id).populate("createdBy", "name email");

  if (!category) return next(new ErrorHandler("Invalid Category id", 400));

  return res.status(200).json({
    success: true,
    category,
  });
});
export const deleteCategory = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;
  const category = await Category.findById(id);
  if (!category) return next(new ErrorHandler("Invalid Category id", 400));
  await category.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Category Deleted Succesfully",
  });
});

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
      description,
      categoryType,
      keywords,
      // visibility,
      // createdBy,
    } = req.body;
    console.log(req.body);

    let category = await Category.findOne({ slug: slug });
    if (category) {
      return res.status(403).json({
        success: false,
        message: `Category ${category.name}'s slug already exists in system. please change slug or Name and try.`,
        status: 403,
      });
    }
    if (!name || !slug) {
      next(new ErrorHandler("Please add Required fileds", 400));
    }

    const categoryCount = await Category.countDocuments();

    console.log(categoryCount);
    category = await Category.create({
      _id: categoryCount,
      menuHierarchy: categoryCount,
      homeHierarchy: categoryCount,
      name,
      slug,
      // visibility,
      description,
      categoryType,
      keywords,
      createdBy: "ritik",
    });

    return res.status(201).json({
      success: true,
      message: `Category ${category.name} has been created`,
    });
  }
);

export const getAllCategory = TryCatch(async (req, res, next) => {
  const categories = await Category.find({});
  return res.status(200).json({
    success: true,
    categories,
  });
});

export const getCategoryDetails = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;

  const category = await Category.findById(id).populate(
    "createdBy",
    "name email"
  );

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

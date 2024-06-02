import { Request, Response, NextFunction } from "express";
import { SubCategory } from "../models/subCategoryModel";
import { Category } from "../models/categoryModel";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import { SubCategoryType } from "../types/types";

export const newSubCategory = TryCatch(
  async (
    req: Request<any, {}, SubCategoryType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      name,
      slug,
      category,
      visibility,
      displayID,
      description,
      sectionType,
      tags,
    } = req.body;

    let categorycheck = await Category.findById({ _id: category });
    if (!categorycheck) {
      res.status(403).json({
        success: false,
        message: `provided category(${category}) not exist in system`,
        status: 404,
      });
    }
    let subCategory = await SubCategory.findById({ _id: slug });
    if (subCategory) {
      res.status(403).json({
        success: false,
        message: `SubCategory ${subCategory.name} already exists in system. please change slug & try`,
        status: 403,
      });
    }
    if (!name || !slug) {
      next(new ErrorHandler("Please add Required fileds", 400));
    }
    subCategory = await SubCategory.create({
      _id: slug,
      name,
      slug,
      category,
      visibility,
      displayID,
      description,
      sectionType,
      tags,
    });

    return res.status(201).json({
      success: true,
      message: `SubCategory ${subCategory.name} has been created`,
    });
  }
);

export const getAllSubCategory = TryCatch(async (req, res, next) => {
  const subCategorys = await SubCategory.find({});

  return res.status(200).json({
    success: true,
    subCategorys,
  });
});

export const getCategoryDetails = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;

  const subCategory = await SubCategory.findById(id);

  if (!subCategory)
    return next(new ErrorHandler("Invalid SubCategory id", 400));

  return res.status(200).json({
    success: true,
    subCategory,
  });
});

export const deleteSubCategory = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory)
    return next(new ErrorHandler("Invalid SubCategory id", 400));
  await subCategory.deleteOne();
  return res.status(200).json({
    success: true,
    message: "SubCategory Deleted Succesfully",
  });
});

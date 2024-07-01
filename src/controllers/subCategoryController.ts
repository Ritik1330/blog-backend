import { Request, Response, NextFunction } from "express";
import { SubCategory } from "../models/subCategoryModel";
import { Category } from "../models/categoryModel";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import { SubCategoryType, CategoryType } from "../types/types";

export const newSubCategory = TryCatch(
  async (
    req: Request<any, {}, SubCategoryType>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, slug, description, categoryType, keywords, category } =
      req.body;

    let categorycheck = await Category.findOne({ name: category });

    if (!categorycheck) {
      return res.status(403).json({
        success: false,
        message: `provided category(${category}) not exist in system`,
        status: 404,
      });
    }
    let subCategory = await SubCategory.findOne({ slug: slug });

    if (subCategory) {
      return res.status(403).json({
        success: false,
        message: `SubCategory ${subCategory.name}'s slug already exists in system. please change slug or Name and try.`,
        status: 403,
      });
    }
    if (!name || !slug) {
      next(new ErrorHandler("Please add Required fileds", 400));
    }

    const subCategoryCount = await SubCategory.countDocuments();
    let subCategoryIndex = (await SubCategory.find({ category: category }))
      .length;

    subCategory = await SubCategory.create({
      _id: subCategoryCount,
      menuHierarchy: subCategoryIndex,
      homeHierarchy: subCategoryCount,
      name,
      slug,
      // visibility,
      description,
      categoryType,
      keywords,
      createdBy: "ritik",
      category,
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

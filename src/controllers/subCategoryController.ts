import { Request, Response, NextFunction } from "express";
import { SubCategory } from "../models/subCategoryModel";
import { Category } from "../models/categoryModel";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import { SubCategoryType, CategoryType } from "../types/types";
import { IDBuilder } from "../helpers";

export const newSubCategory = TryCatch(
  async (
    req: Request<any, {}, SubCategoryType>,
    res: Response,
    next: NextFunction
  ) => {
    const { title, slug, description, categoryType, keywords, category } =
      req.body;

    let categorycheck = await Category.findById(category);

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
        message: `SubCategory ${subCategory.title}'s slug already exists in system. please change slug or Name and try.`,
        status: 403,
      });
    }
    if (!title || !slug) {
      next(new ErrorHandler("Please add Required fileds", 400));
    }

    const subCategoryCount = await SubCategory.countDocuments();
    let subCategoryIndex = (await SubCategory.find({ category: category }))
      .length;

    const uid = await IDBuilder("mongoDB");
    if (!uid) {
      return res.status(500).json({
        success: false,
        message:
          "uid creation failed; please try again or contact system admin.",
      });
    }
    subCategory = await SubCategory.create({
      _id: uid,
      menuHierarchy: subCategoryIndex,
      homeHierarchy: subCategoryCount,
      title: title,
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
      message: `SubCategory ${subCategory.title} has been created`,
    });
  }
);

export const getAllSubCategory = TryCatch(async (req, res, next) => {
  const slug = req.query.slug || "";

  if (slug) {
    const subCategory = await SubCategory.findOne({ slug });
    if (!subCategory)
      return next(new ErrorHandler("Invalid subCategory slug", 400));

    return res.status(200).json({
      success: true,
      subCategory,
    });
  }

  const subCategories = await SubCategory.find({});

  return res.status(200).json({
    success: true,
    subCategories,
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

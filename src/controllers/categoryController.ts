import { Request, Response, NextFunction } from "express";
import { Category } from "../models/categoryModel";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import { CategoryType } from "../types/types";
import { User } from "../models/User";
import { IDBuilder } from "../helpers";

export const newCategory = TryCatch(
  async (
    req: Request<any, {}, CategoryType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      title,
      slug,
      description,
      categoryType,
      keywords,
      // visibility,
      // createdBy,
    } = req.body;

    if (!title || !slug) {
      next(new ErrorHandler("Please add Required fileds", 400));
    }

    let category = await Category.findOne({ slug: slug });
    if (category) {
      return res.status(403).json({
        success: false,
        message: `Category ${category.title}'s slug already exists in system. please change slug or Name and try.`,
        status: 403,
      });
    }
    const uid = await IDBuilder("mongoDB");
    if (!uid) {
      return res.status(500).json({
        success: false,
        message:
          "uid creation failed; please try again or contact system admin.",
      });
    }
    const categoryCount = await Category.countDocuments();

    category = await Category.create({
      _id: uid,
      menuHierarchy: categoryCount,
      homeHierarchy: categoryCount,
      title: title,
      slug,
      // visibility,
      description,
      categoryType,
      keywords,
      createdBy: "ritik",
    });

    return res.status(201).json({
      success: true,
      message: `Category ${category.title} has been created`,
    });
  }
);

export const getAllCategory = TryCatch(async (req, res, next) => {
  const status = req.query.status || "";
  const limit: number = parseInt(req.query.limit as string);
  const page: number = parseInt(req.query.page as string) || 1;
  const slug = req.query.slug || "";

  if (slug) {
    const category = await Category.findOne({ slug });
    if (!category) return next(new ErrorHandler("Invalid Category slug", 400));

    return res.status(200).json({
      success: true,
      category,
    });
  }
  interface queryInterface {
    status?: any;
    page?: any;
    limit?: any;
  }
  const query: queryInterface = {
    // title: { $regex: search, $options: "i" },
  };

  if (status) {
    query.status = status;
  }
  // if (limit) {
  //   query.limit = limit;
  // }
  // if (page) {
  //   query.page = page;
  // }
  const skip = (page - 1) * limit || 0; // 1 * 4 = 4

  let categories: any = [];
  if (limit) {
    categories = await Category.find(query).limit(limit).skip(skip);
  } else {
    categories = await Category.find(query);
  }
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

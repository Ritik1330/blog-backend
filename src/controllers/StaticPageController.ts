import { Request, Response, NextFunction } from "express";
import { StaticPage } from "../models/staticPageModel";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import { StaticPageType } from "../types/types";
export const newStaticPage = TryCatch(
  async (
    req: Request<any, {}, StaticPageType>,
    res: Response,
    next: NextFunction
  ) => {
    const { title, content, slug, status, metaData } = req.body;
    if (!title || !slug || !content) {
      next(new ErrorHandler("Please add Required fileds", 404));
    }

    let staticPages = await StaticPage.findOne({ slug: slug });
    if (staticPages) {
      return res.status(403).json({
        success: false,
        message: `StaticPage slug already exists in system. please change slug or Name and try.`,
        status: 403,
      });
    }

    const staticPagesCount = await StaticPage.countDocuments();

    staticPages = await StaticPage.create({
      _id: staticPagesCount,
      title,
      content,
      slug,
      status,
      createdBy: "2",
      metaData: metaData,
    });

    return res.status(201).json({
      success: true,
      message: `StaticPage has been created`,
    });
  }
);

export const getStaticPageDetails = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;

  const staticPage = await StaticPage.findById(id);

  if (!staticPage) return next(new ErrorHandler("Invalid SubCategory id", 400));

  return res.status(200).json({
    success: true,
    staticPage,
  });
});

export const getAllStaticPage = TryCatch(async (req, res, next) => {
  const slug = req.query.slug || "";

  if (slug) {
    const staticPage = await StaticPage.findOne({ slug });
    if (!staticPage)
      return next(new ErrorHandler("Invalid subCategory slug", 400));

    return res.status(200).json({
      success: true,
      page: staticPage,
    });
  }

  const staticPages = await StaticPage.find({});
  return res.status(200).json({
    success: true,
    pages: staticPages,
  });
});

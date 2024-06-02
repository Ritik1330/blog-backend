import { Request, Response, NextFunction } from "express";
import { Post } from "../models/postModel";
import { PostType, myParams } from "../types/types";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
// import { translate } from "bing-translate-api";
import { translate } from "@vitalets/google-translate-api";
// import { singleUpload } from "../middlewares/multer";

export const newPost = TryCatch(
  async (
    req: Request<any, {}, PostType>,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.body);
    const {
      title,
      summary,
      blocks,
      version,
      category,
      tags,
      author,
      postType,
      thumbImage,
    } = req.body;

    if (
      !title ||
      !summary ||
      !blocks ||
      !version ||
      !category ||
      !tags ||
      !author ||
      !postType ||
      !thumbImage
    ) {
      console.log("first");
      next(new ErrorHandler("Please add all fileds", 400));
    }

    const { text } = await translate(title, { to: "en" });
    if (!text) {
      next(
        new ErrorHandler("Somthing whent Wrong During Title translate ", 400)
      );
    }
console.log(text)
    const stringWithoutSpaces = text.replace(/\s+/g, "-");

    let titleValue = stringWithoutSpaces?.slice(0, 150);
 
    let post = await Post.create({
      title,
      summary,
      blocks,
      version,
      category,
      tags,
      author,
      postType,
      thumbImage,
      _id: titleValue,
      url: `${titleValue}-89`,
    });

    return res.status(201).json({
      success: true,
      message: ` ${post.type} has been created`,
    });
  }
);

export const getAllPost = TryCatch(async (req, res, next) => {
  const posts = await Post.find({});
  // const posts = await Post.find({}).select('title summary thumbImage.title');
  return res.status(200).json({
    success: true,
    posts,
  });
});

export const getPostDetails = TryCatch(async (req, res, next) => {
  const id: string = req.params.id;
  const post = await Post.findById(id);
  if (!post) return next(new ErrorHandler("Invalid Post id", 400));

  return res.status(200).json({
    success: true,
    post,
  });
});

export const getCategoryPosts = TryCatch(async (req, res, next) => {
  const category: string = req.params.category;
  console.log(category);
  const posts = await Post.find({ category: { $in: [category] } });
  return res.status(200).json({
    success: true,
    posts,
  });
});

// // export const deletePost = TryCatch(async (req, res, next) => {
//   const id: string = req.params.id;
//   const user = await User.findById(id);
//   if (!user) return next(new ErrorHandler("Invalid User id", 400));
//   await user.deleteOne();
//   return res.status(200).json({
//     success: true,
//     message: "User Deleted Succesfully",
//   });
// });

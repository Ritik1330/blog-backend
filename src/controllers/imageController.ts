import { Request, Response, NextFunction } from "express";
import { ImageType } from "../types/types";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import { uploadsOnCloudinary } from "../utils/cloudinary";

// Optimized Image Upload Controller with cleanup logic
export const imageUpload = TryCatch(
  async (
    req: Request<{}, {}, ImageType>,
    res: Response,
    next: NextFunction
  ) => {
    const { title, credits } = req.body;
console.log("1111")
    // Ensure the file is present
    if (!req.file) {
      return next(new ErrorHandler("Please provide an image", 404));
    }

    try {
      // Upload the file to Cloudinary
      const result = await uploadsOnCloudinary(req);

      if (!result) {
        throw new ErrorHandler("Image upload failed on Cloudinary", 500);
      }

      // Return success response if upload is successful
      return res.status(200).json({
        success: true,
        status: 200,
        result, // Return the Cloudinary result
      });
    } catch (error) {
      next(error);
    }
  }
);

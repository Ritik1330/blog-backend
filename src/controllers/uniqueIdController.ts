import { Request, Response, NextFunction } from "express";
import { UniqueId } from "../models/uniqueIdModel";
import { newUniqueIdRequestBody } from "../types/types";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";

export const newUniqueId = TryCatch(
  async (
    req: Request<any, {}, newUniqueIdRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { idFor } = req.body;
      if (!idFor) {
        throw new ErrorHandler("Please add counter key", 400);
      }
      let uniqueId = await UniqueId.findOne({ idFor });
      if (uniqueId) {
        const uniqueIds = await UniqueId.findOneAndUpdate(
          { idFor },
          { $inc: { count: 1 } }
        );

        return res.status(200).json({
          success: true,
          message: `uniqueId count has been updated for ${uniqueId?.idFor} `,
          uniqueIds,
          status: 200,
        });
      }

      uniqueId = await UniqueId.create({
        _id: idFor,
        idFor,
        count: 1,
      });

      return res.status(201).json({
        success: true,
        message: `New uniqueId created successfully`,
      });
    } catch (error) {
      next(error); // Pass error to error handling middleware
    }
  }
);
//test of load
export const idFor = TryCatch(
  async (
    req: Request<any, {}, newUniqueIdRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const uniqueIds = await UniqueId.findOneAndUpdate(
        { idFor: "idFor" },
        { $inc: { count: 1 } }
      );

      return res.status(201).json({
        success: true,
        message: `New uniqueId had been update successfully`,
        uniqueIds,
      });
    } catch (error) {
      next(error); // Pass error to error handling middleware
    }
  }
);

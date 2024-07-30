import { Request, Response, NextFunction } from "express";
import { UniqueId } from "../models/uniqueIdModel";
import { newUniqueIdRequestBody } from "../types/types";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";

//test of load
export const IDBuilder = async (idFor: string) => {
  try {
    const uniqueIds = await UniqueId.findByIdAndUpdate(idFor, {
      $inc: { count: 1 },
    });
    return uniqueIds?.count;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

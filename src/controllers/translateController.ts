import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import { translate } from "@vitalets/google-translate-api";
import { HttpProxyAgent } from "http-proxy-agent";
import { translate as bingtranslate } from "bing-translate-api";

export const translater = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { to, value } = req.query as { to?: string; value?: string };
    if (!value) {
      next(new ErrorHandler("please provide text value", 400));
      return;
    }
    let language = to ? to.toString() : "en";
    try {
      const result = await bingtranslate(value?.toString(), null, language);

      // const result = await translate(value?.toString(), { to: language,});
      return res.status(200).json({
        success: true,
        // translated: result?.text,
        translated: result?.translation,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      next(
        new ErrorHandler("Something went Wrong During Title translate", 400)
      );
    }
  }
);

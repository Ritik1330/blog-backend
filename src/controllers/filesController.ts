import { Request, Response, NextFunction } from "express";
import { UniqueId } from "../models/uniqueIdModel";
import { ImageType } from "../types/types";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "../middlewares/error";
import Image from "../models/imageModele";

export const imageUpload = TryCatch(
  async (
    req: Request<any, {}, ImageType>,
    res: Response,
    next: NextFunction
  ) => {
    const { title, credits } = req.body;

    // let hostname =
    //   process.env.NODE_ENV !== "production"
    //     ? `${process.env.HOST_NAME}:${process.env.PORT}`
    //     : `${process.env.HOST_NAME}`;
    // let fileUrl = `${hostname}/${req.file?.path.replace(/\\/g, "/")}`;

    const image = await Image.create({
      _id: req.file?.filename,
      title,
      credits,
      updatedby: "ritik",
      url: req.file?.path.replace(/\\/g, "/"),
    });

    return res.status(200).json({
      success: true,
      status: 200,
      image,
    });
  }
);

// export const newUser = TryCatch(
//   async (
//     req: Request<any, {}, newUserRequstBody>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const { name, email, photo, role, dob, gender, _id } = req.body;

//     let user = await User.findById(_id);
//     if (user) {
//       res.status(200).json({
//         success: true,
//         message: `Welcome back ${user.name}`,
//         status: 200,
//       });
//     }
//     if (!_id || !name || !email || !photo || !dob || !gender) {
//       console.log("first");
//       next(new ErrorHandler("Please add all fileds", 400));
//     }

//     user = await User.create({
//       name,
//       email,
//       photo,
//       // role,
//       dob: new Date(dob),
//       gender,
//       _id,
//     });

//     return res.status(201).json({
//       success: true,
//       message: `Welcome ${user.name}`,
//     });
//   }
// // );

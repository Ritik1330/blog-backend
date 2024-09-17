"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const error_1 = require("../middlewares/error");
const imageModel_1 = require("../models/imageModel");
const cloudinary_1 = require("../utils/cloudinary");
exports.imageUpload = (0, error_1.TryCatch)(async (req, res, next) => {
    const { title, credits } = req.body;
    // let hostname =
    //   process.env.NODE_ENV !== "production"
    //     ? `${process.env.HOST_NAME}:${process.env.PORT}`
    //     : `${process.env.HOST_NAME}`;
    // let fileUrl = `${hostname}/${req.file?.path.replace(/\\/g, "/")}`;
    let localFilePath = await req.file?.path.replace(/\\/g, "/");
    console.log("localFilePath");
    console.log(localFilePath);
    if (!localFilePath) {
        next(new utility_class_1.default("please provide image", 404));
    }
    else {
        try {
            localFilePath = await (0, cloudinary_1.uploadsOnCloudinary)(localFilePath);
        }
        catch (error) {
            next(new utility_class_1.default("image upload fail on Cloudinary", 500));
        }
    }
    const image = await imageModel_1.Image.create({
        _id: req.file?.filename,
        title,
        credits,
        updatedby: "ritik",
        url: localFilePath || "",
        storage: process.env.STORAGE,
    });
    console.log(localFilePath);
    process.env.STORAGE !== "cloudinary"
        ? (image.url = `${process.env.HOST_NAME}/${localFilePath}`)
        : (image.url = image.url);
    return res.status(200).json({
        success: true,
        status: 200,
        image,
    });
});
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

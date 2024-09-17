"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const uploadsOnCloudinary = async (localfilepath) => {
    //   console.log(uploadsOnCloudinary);
    console.log(process.env.CLOUDINARY_CLOUD_NAME);
    try {
        if (!localfilepath)
            return undefined;
        //upload the file on cloudinary
        const result = await cloudinary_1.v2.uploader.upload(localfilepath, {
            folder: "blogapp",
            resource_type: "auto",
        });
        //file has been upload successfull
        console.log(result);
        return result.secure_url;
    }
    catch (error) {
        //remove the localiy saved temprorary file as the upload opreatin faild
        fs_1.default.unlinkSync(localfilepath);
        console.error(error);
    }
};
exports.uploadsOnCloudinary = uploadsOnCloudinary;

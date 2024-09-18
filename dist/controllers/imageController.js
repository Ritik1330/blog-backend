"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const error_1 = require("../middlewares/error");
const cloudinary_1 = require("../utils/cloudinary");
const imageModel_1 = require("../models/imageModel");
const uuid_1 = require("uuid");
// Optimized Image Upload Controller with cleanup logic
exports.imageUpload = (0, error_1.TryCatch)(async (req, res, next) => {
    const { title, credits } = req.body;
    // Ensure the file is present
    if (!req.file) {
        return next(new utility_class_1.default("Please provide an image", 404));
    }
    try {
        // Upload the file to Cloudinary
        const result = await (0, cloudinary_1.uploadsOnCloudinary)(req);
        if (!result) {
            throw new utility_class_1.default("Image upload failed on Cloudinary", 500);
        }
        const image = await imageModel_1.Image.create({
            _id: (0, uuid_1.v4)(),
            title,
            credits,
            updatedby: "ritik",
            url: result || "",
            storage: process.env.STORAGE,
        });
        // Return success response if upload is successful
        return res.status(200).json({
            success: true,
            status: 200,
            image,
        });
    }
    catch (error) {
        next(error);
    }
});

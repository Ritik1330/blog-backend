"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
// Upload to Cloudinary using a stream
const uploadsOnCloudinary = async (req) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: "blogapp",
            resource_type: "auto",
        }, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result); // Return Cloudinary's result object
        });
        streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
    });
};
exports.uploadsOnCloudinary = uploadsOnCloudinary;

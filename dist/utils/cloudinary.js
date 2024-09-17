"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const uploadsOnCloudinary = async (req) => {
    const { file } = req;
    console.log("2222");
    // Assuming you're using streams or attaching listeners
    return new Promise((resolve, reject) => {
        if (!file)
            return reject(new Error("No file provided"));
        console.log("2222");
        // Cloudinary upload logic here, e.g., streams
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: "blogapp",
            resource_type: "auto",
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result?.secure_url);
        });
        // Attach the file stream to the Cloudinary uploader
        stream.end(file.buffer);
        // CLEANUP: ensure the 'close' listener is cleaned up
        stream.on("close", () => {
            stream.removeAllListeners("close");
        });
        // CLEANUP: ensure error listener is also cleaned up
        stream.on("error", (err) => {
            stream.removeAllListeners("error");
            reject(err);
        });
    });
};
exports.uploadsOnCloudinary = uploadsOnCloudinary;

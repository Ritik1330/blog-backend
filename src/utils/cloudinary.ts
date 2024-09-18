import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Upload to Cloudinary using a stream
export const uploadsOnCloudinary = async (req: any) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "blogapp",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result?.secure_url); // Return Cloudinary's result object
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

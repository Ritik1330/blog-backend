import { Request } from "express";
import { v2 as cloudinary } from "cloudinary";

export const uploadsOnCloudinary = async (req: Request) => {
  const { file } = req;

  console.log("2222");
  // Assuming you're using streams or attaching listeners
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));
    console.log("2222");
    // Cloudinary upload logic here, e.g., streams
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "blogapp",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url);
      }
    );

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

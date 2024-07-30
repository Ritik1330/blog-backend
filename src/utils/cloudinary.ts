import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadsOnCloudinary = async (localfilepath: string) => {

//   console.log(uploadsOnCloudinary);
console.log(process.env.CLOUDINARY_CLOUD_NAME)
  try {
    if (!localfilepath) return undefined;
    //upload the file on cloudinary
    const result = await cloudinary.uploader.upload(localfilepath, {
      folder: "blogapp",
      resource_type: "auto",
    });
    //file has been upload successfull
    console.log(result);
    return result.secure_url;
  } catch (error) {
    //remove the localiy saved temprorary file as the upload opreatin faild
    fs.unlinkSync(localfilepath);
    console.error(error);
  }
};



export { uploadsOnCloudinary };

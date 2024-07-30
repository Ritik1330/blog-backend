import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    const id = uuid(); // Generating a unique identifier for the file
    const extName = file.originalname.replace(/\s+/g, "-");
    callback(null, `${id}-${extName}`);
  },
});

export const singleUpload = multer({ storage });

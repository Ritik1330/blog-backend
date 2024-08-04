import express from "express";
import { imageUpload } from "../controllers/imageController";
import { singleUpload } from "../middlewares/multer";

const app = express.Router();

app.post("/image", singleUpload.single("image"), imageUpload);
// app.get("/imageUplode", imageUplode);

export default app;
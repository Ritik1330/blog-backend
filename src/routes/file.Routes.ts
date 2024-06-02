import express from "express";
import { imageUpload } from "../controllers/filesController";
import { singleUpload } from "../middlewares/multer";

const app = express.Router();

app.post("/image",singleUpload, imageUpload);
// app.get("/imageUplode", imageUplode);

export default app;
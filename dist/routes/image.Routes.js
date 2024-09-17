"use strict";
// import express from "express";
// import { imageUpload } from "../controllers/imageController";
// import { singleUpload } from "../middlewares/multer";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// const app = express.Router();
// app.post("/image", singleUpload.single("image"), imageUpload);
// // app.get("/imageUplode", imageUplode);
// export default app;
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../controllers/imageController");
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
router.post("/image", multer_1.singleUpload.single("image"), imageController_1.imageUpload);
exports.default = router;
exports.config = {
    api: {
        bodyParser: false,
    },
};

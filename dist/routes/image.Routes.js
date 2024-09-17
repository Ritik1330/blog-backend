"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../controllers/imageController");
const multer_1 = require("../middlewares/multer");
const app = express_1.default.Router();
app.post("/image", multer_1.singleUpload.single("image"), imageController_1.imageUpload);
// app.get("/imageUplode", imageUplode);
exports.default = app;

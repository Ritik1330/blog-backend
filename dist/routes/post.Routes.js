"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { adminOnly,  } from '../middlewares/auth';
const postController_1 = require("../controllers/postController");
const app = express_1.default.Router();
app.post("/", postController_1.newPost);
app.get("/", postController_1.getAllPost);
app.get("/:id", postController_1.getPostDetails);
exports.default = app;

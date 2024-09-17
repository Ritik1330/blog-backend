"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
// import { adminOnly,  } from '../middlewares/auth';
const app = express_1.default.Router();
app.post("/", categoryController_1.newCategory);
app.get("/", categoryController_1.getAllCategory);
app.get("/:id", categoryController_1.getCategoryDetails);
app.delete("/:id", categoryController_1.deleteCategory);
exports.default = app;

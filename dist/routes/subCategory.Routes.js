"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategoryController_1 = require("../controllers/subCategoryController");
// import { adminOnly,  } from '../middlewares/auth';
const app = express_1.default.Router();
app.post("/", subCategoryController_1.newSubCategory);
app.get("/", subCategoryController_1.getAllSubCategory);
app.get("/:id", subCategoryController_1.getCategoryDetails);
app.delete("/:id", subCategoryController_1.deleteSubCategory);
exports.default = app;

import express from "express";
import {
  newSubCategory,
  getAllSubCategory,
  getCategoryDetails,
  deleteSubCategory,
} from "../controllers/subCategoryController";
// import { adminOnly,  } from '../middlewares/auth';

const app = express.Router();

app.post("/new", newSubCategory);
app.get("/all", getAllSubCategory);
app.get("/:id", getCategoryDetails);
app.delete("/:id", deleteSubCategory);

export default app;

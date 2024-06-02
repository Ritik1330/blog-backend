import express from "express";
import { newCategory,getAllCategory,getCategoryDetails ,deleteCategory} from "../controllers/categoryController";
// import { adminOnly,  } from '../middlewares/auth';

const app = express.Router();

app.post("/new", newCategory);
app.get("/all", getAllCategory);
app.get("/:id", getCategoryDetails);
app.delete("/:id", deleteCategory);

export default app;

import express from "express";
import {
  newTag,
  getAllTags,
  getTagDetails,
  deleteTag,
} from "../controllers/tagController";

const app = express.Router();

app.post("/new", newTag);
app.get("/all", getAllTags);
app.get("/:id", getTagDetails);
app.delete("/:id", deleteTag);

export default app;
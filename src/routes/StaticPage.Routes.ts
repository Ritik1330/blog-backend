import express from "express";
import { getAllStaticPage, getStaticPageDetails, newStaticPage } from "../controllers/StaticPageController";

const app = express.Router();

app.post("/", newStaticPage);
app.get("/", getAllStaticPage);
app.get("/:id", getStaticPageDetails);


export default app;

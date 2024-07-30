import express from "express";
import { getAllStaticPage, newStaticPage } from "../controllers/StaticPageController";

const app = express.Router();

app.post("/", newStaticPage);
app.get("/", getAllStaticPage);


export default app;

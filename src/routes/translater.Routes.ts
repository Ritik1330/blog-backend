import express from "express";
import { translater } from "../controllers/translateController";

const app = express.Router();

app.put("/", translater);

export default app;

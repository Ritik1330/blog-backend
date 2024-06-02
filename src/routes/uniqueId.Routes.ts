import express from "express";
import { newUniqueId, idFor } from "../controllers/uniqueIdController";

const app = express.Router();

app.post("/new", newUniqueId);
app.get("/idFor", idFor);

export default app;

import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user";
// import { adminOnly,  } from '../middlewares/auth';

const app = express.Router();

app.post("/", newUser);

app.get("/", getAllUsers);

app.get("/:id", getUser);

app.delete("/user/:id", deleteUser);

export default app;

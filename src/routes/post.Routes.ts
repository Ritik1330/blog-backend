import express from 'express';
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/user';
// import { adminOnly,  } from '../middlewares/auth';
import { newPost,getAllPost, getPostDetails } from '../controllers/postController';


const app = express.Router();

app.post("/", newPost);
app.get("/", getAllPost);
app.get("/:id", getPostDetails);



export default app;
import express from 'express';
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/user';
// import { adminOnly,  } from '../middlewares/auth';
import { newPost,getAllPost, getPostDetails, getCategoryPosts } from '../controllers/postController';
import { singleUpload } from '../middlewares/multer';

const app = express.Router();

app.post("/new", newPost);
app.get("/all", getAllPost);
app.get("/:id", getPostDetails);
app.get("/category/:category", getCategoryPosts);



export default app;
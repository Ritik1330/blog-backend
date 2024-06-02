import express from 'express';
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/user';
// import { adminOnly,  } from '../middlewares/auth';


const app = express.Router();

// authorizeRoles
// authrizeRoles("user"),

// route = api/v1/user/new 
app.post("/user/new", newUser);
// route = api/v1/user/all
app.get("/user/all", getAllUsers);
// route = api/v1/user/dynamicID
app.get("/user/:id", getUser);

app.delete("/user/:id", deleteUser);


export default app;
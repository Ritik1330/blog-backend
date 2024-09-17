"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
// import { adminOnly,  } from '../middlewares/auth';
const app = express_1.default.Router();
app.post("/", user_1.newUser);
app.get("/", user_1.getAllUsers);
app.get("/:id", user_1.getUser);
app.delete("/user/:id", user_1.deleteUser);
exports.default = app;

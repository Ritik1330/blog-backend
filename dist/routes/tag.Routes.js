"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tagController_1 = require("../controllers/tagController");
const app = express_1.default.Router();
app.post("/", tagController_1.newTag);
app.get("/", tagController_1.getAllTags);
app.get("/:id", tagController_1.getTagDetails);
app.delete("/:id", tagController_1.deleteTag);
exports.default = app;

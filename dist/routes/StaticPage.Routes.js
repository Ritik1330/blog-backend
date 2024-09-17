"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StaticPageController_1 = require("../controllers/StaticPageController");
const app = express_1.default.Router();
app.post("/", StaticPageController_1.newStaticPage);
app.get("/", StaticPageController_1.getAllStaticPage);
app.get("/:id", StaticPageController_1.getStaticPageDetails);
exports.default = app;

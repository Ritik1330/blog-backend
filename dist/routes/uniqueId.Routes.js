"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uniqueIdController_1 = require("../controllers/uniqueIdController");
const app = express_1.default.Router();
app.post("/", uniqueIdController_1.newUniqueId);
app.get("/idFor", uniqueIdController_1.idFor);
exports.default = app;

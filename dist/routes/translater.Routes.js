"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const translateController_1 = require("../controllers/translateController");
const app = express_1.default.Router();
app.put("/", translateController_1.translater);
exports.default = app;

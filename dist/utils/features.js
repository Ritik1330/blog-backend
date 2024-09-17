"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    mongoose_1.default
        // .connect("mongodb://localhost:27017", { dbName: "blogAppDb" })
        .connect(process.env.MONGODBURL || '')
        .then((c) => console.log(`mogo Db connected on => ${c.connection.host}`))
        .catch((e) => console.log(`mogoDb not connected due to ${e}`));
};
exports.connectDb = connectDb;

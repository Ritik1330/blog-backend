"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uniqueIdSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        required: [true, "Please enter ID"],
    },
    idFor: {
        type: String,
        required: [true, "Please enter idFor"],
    },
    count: {
        type: Number,
        required: [true, "Please enter count"],
    },
}, {
    timestamps: true,
});
exports.UniqueId = mongoose_1.default.model("uniqueId", uniqueIdSchema);

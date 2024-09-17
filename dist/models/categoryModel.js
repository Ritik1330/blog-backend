"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const categorySchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: [true, "Please enter ID"],
    },
    title: {
        type: String,
        required: [true, "Please enter Name"],
        unique: true,
    },
    slug: {
        type: String,
        required: [true, "Please enter Slug"],
        unique: true,
    },
    description: {
        type: String,
    },
    keywords: {
        type: [String],
    },
    menuHierarchy: {
        type: Number,
        unique: true,
        required: [
            true,
            "Please enter the Menu Bar Hierarchy or connect with the system administrator.",
        ],
    },
    homeHierarchy: {
        type: Number,
        unique: true,
        required: [true, "Please enter Home Hierarchy"],
    },
    visibility: {
        type: String,
        enum: ["hamburgerMenu", "mainMenu", "both", null],
        default: "both",
    },
    categoryType: {
        type: String,
        default: "section",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    createdBy: {
        type: String,
        ref: "User",
        required: true,
    },
    updatedBy: {
        type: [String],
        ref: "User",
    },
}, {
    timestamps: true,
});
exports.Category = mongoose_1.default.model("Category", categorySchema);

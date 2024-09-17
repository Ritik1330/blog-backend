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
exports.StaticPage = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const schema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: [true, "Please enter ID"],
    },
    title: {
        type: String,
        required: [true, "Please enter Title"],
    },
    content: {
        time: { type: String, required: true },
        blocks: [
            {
                id: { type: String, required: true },
                type: { type: String, required: true },
                data: { type: mongoose_1.Schema.Types.Mixed, required: true },
            },
        ],
        version: { type: String, required: true },
    },
    slug: {
        type: String,
        required: [true, "Please enter Name"],
    },
    status: {
        type: String,
        enum: ["Public", "Private"],
        default: "Public",
    },
    metaData: {
        metatitle: String,
        metaDescription: String,
        keywords: [String],
        canonicalUrl: {
            type: String,
        },
        index: {
            type: Boolean,
            default: true,
        },
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
exports.StaticPage = mongoose_1.default.model("Static", schema);

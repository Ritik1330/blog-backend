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
exports.Post = void 0;
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
    summary: String,
    description: String,
    image: {
        type: String,
        ref: "Image",
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
    postType: {
        type: String,
        enum: ["Article", "Slide", "Webstory", "EPaper"],
        required: true,
    },
    primaryCategory: {
        type: String,
        required: [true, "Please enter Main Category"],
    },
    categories: {
        type: [String],
        required: [true, "Please enter Category"],
    },
    subcategories: {
        type: [String],
        required: [true, "Please enter SubCategory"],
    },
    slug: {
        type: String,
        required: [true, "Please enter Name"],
    },
    tags: {
        type: [String],
        required: [true, "Please enter tags"],
        ref: "Tag",
    },
    authors: [String],
    status: {
        type: String,
        enum: ["Draft", "Published", "Archived"],
        default: "Draft",
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
    publicAt: {
        type: Date,
        default: Date.now,
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
    socialData: {
        ogtitle: String,
        ogImage: String,
        hashtags: [String],
    },
    schemaData: {
        articleTypeSchema: {
            type: String,
            enum: ["None", "Article", "NewsArticle", "BlogPosting"],
            default: "None",
        },
        otherSchema: {
            type: String,
            enum: ["None", "FAQPage", "JobPosting"],
            schemaData: mongoose_1.Schema.Types.Mixed,
            default: "None",
        },
    },
    views: Number,
    version: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true,
});
exports.Post = mongoose_1.default.model("Post", schema);

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
exports.Image = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ImageSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: [true, "A unique image ID is required"],
    },
    storage: {
        type: String,
        required: [true, "Please enter the storage origin."],
    },
    title: {
        type: String,
        required: [true, "Please enter image title"],
    },
    url: {
        type: String,
        unique: true,
        required: [true, "Please enter the URL"],
        validate: {
            validator: function (v) {
                // Simple URL validation regex, you might need a more robust one
                return /.(jpeg|jpg|gif|png|webp)$/i.test(v);
            },
            message: (props) => `${props.value} is not a valid URL for an image!`,
        },
    },
    credits: {
        type: String,
    },
    updatedby: {
        type: String,
        required: [true, "Please enter updatedby"],
    },
}, {
    timestamps: true,
});
exports.Image = mongoose_1.default.model("Image", ImageSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translater = void 0;
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const error_1 = require("../middlewares/error");
const bing_translate_api_1 = require("bing-translate-api");
exports.translater = (0, error_1.TryCatch)(async (req, res, next) => {
    const { to, value } = req.query;
    if (!value) {
        next(new utility_class_1.default("please provide text value", 400));
        return;
    }
    let language = to ? to.toString() : "en";
    try {
        const result = await (0, bing_translate_api_1.translate)(value?.toString(), null, language);
        // const result = await translate(value?.toString(), { to: language,});
        return res.status(200).json({
            success: true,
            // translated: result?.text,
            translation: result?.translation,
        });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        next(new utility_class_1.default("Something went Wrong During Title translate", 400));
    }
});

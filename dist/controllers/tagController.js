"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.getTagDetails = exports.getAllTags = exports.newTag = void 0;
const tagModel_1 = require("../models/tagModel");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const error_1 = require("../middlewares/error");
exports.newTag = (0, error_1.TryCatch)(async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        next(new utility_class_1.default("Please add Required fileds", 400));
    }
    let tag = await tagModel_1.Tag.findOne({ name: name });
    if (tag) {
        return res.status(403).json({
            success: false,
            message: `Tag ${tag.name}'s already exists in system. please change Tag and try.`,
            status: 403,
        });
    }
    const tagCount = await tagModel_1.Tag.countDocuments();
    tag = await tagModel_1.Tag.create({
        _id: tagCount,
        name,
    });
    return res.status(201).json({
        success: true,
        message: `Tag ${tag.name} has been created`,
    });
});
exports.getAllTags = (0, error_1.TryCatch)(async (req, res, next) => {
    const tags = await tagModel_1.Tag.find({}).sort("-_id");
    return res.status(200).json({
        success: true,
        tags,
    });
});
exports.getTagDetails = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const tag = await tagModel_1.Tag.findById(id);
    if (!tag)
        return next(new utility_class_1.default("Invalid Tag id", 400));
    return res.status(200).json({
        success: true,
        tag,
    });
});
exports.deleteTag = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const tag = await tagModel_1.Tag.findById(id);
    if (!tag)
        return next(new utility_class_1.default("Invalid Tag id", 400));
    await tag.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Tag Deleted Succesfully",
    });
});

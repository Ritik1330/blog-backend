"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategoryDetails = exports.getAllCategory = exports.newCategory = void 0;
const categoryModel_1 = require("../models/categoryModel");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const error_1 = require("../middlewares/error");
const helpers_1 = require("../helpers");
exports.newCategory = (0, error_1.TryCatch)(async (req, res, next) => {
    const { title, slug, description, categoryType, keywords,
    // visibility,
    // createdBy,
     } = req.body;
    if (!title || !slug) {
        next(new utility_class_1.default("Please add Required fileds", 400));
    }
    let category = await categoryModel_1.Category.findOne({ slug: slug });
    if (category) {
        return res.status(403).json({
            success: false,
            message: `Category ${category.title}'s slug already exists in system. please change slug or Name and try.`,
            status: 403,
        });
    }
    const uid = await (0, helpers_1.IDBuilder)("mongoDB");
    if (!uid) {
        return res.status(500).json({
            success: false,
            message: "uid creation failed; please try again or contact system admin.",
        });
    }
    const categoryCount = await categoryModel_1.Category.countDocuments();
    category = await categoryModel_1.Category.create({
        _id: uid,
        menuHierarchy: categoryCount,
        homeHierarchy: categoryCount,
        title: title,
        slug,
        // visibility,
        description,
        categoryType,
        keywords,
        createdBy: "ritik",
    });
    return res.status(201).json({
        success: true,
        message: `Category ${category.title} has been created`,
    });
});
exports.getAllCategory = (0, error_1.TryCatch)(async (req, res, next) => {
    const status = req.query.status || "";
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page) || 1;
    const slug = req.query.slug || "";
    if (slug) {
        const category = await categoryModel_1.Category.findOne({ slug });
        if (!category)
            return next(new utility_class_1.default("Invalid Category slug", 400));
        return res.status(200).json({
            success: true,
            category,
        });
    }
    const query = {
    // title: { $regex: search, $options: "i" },
    };
    if (status) {
        query.status = status;
    }
    // if (limit) {
    //   query.limit = limit;
    // }
    // if (page) {
    //   query.page = page;
    // }
    const skip = (page - 1) * limit || 0; // 1 * 4 = 4
    let categories = [];
    if (limit) {
        categories = await categoryModel_1.Category.find(query).limit(limit).skip(skip);
    }
    else {
        categories = await categoryModel_1.Category.find(query);
    }
    return res.status(200).json({
        success: true,
        categories,
    });
});
exports.getCategoryDetails = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const category = await categoryModel_1.Category.findById(id).populate("createdBy", "name email");
    if (!category)
        return next(new utility_class_1.default("Invalid Category id", 400));
    return res.status(200).json({
        success: true,
        category,
    });
});
exports.deleteCategory = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const category = await categoryModel_1.Category.findById(id);
    if (!category)
        return next(new utility_class_1.default("Invalid Category id", 400));
    await category.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Category Deleted Succesfully",
    });
});

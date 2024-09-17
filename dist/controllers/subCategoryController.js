"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.getCategoryDetails = exports.getAllSubCategory = exports.newSubCategory = void 0;
const subCategoryModel_1 = require("../models/subCategoryModel");
const categoryModel_1 = require("../models/categoryModel");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const error_1 = require("../middlewares/error");
const helpers_1 = require("../helpers");
exports.newSubCategory = (0, error_1.TryCatch)(async (req, res, next) => {
    const { title, slug, description, categoryType, keywords, category } = req.body;
    let categorycheck = await categoryModel_1.Category.findById(category);
    if (!categorycheck) {
        return res.status(403).json({
            success: false,
            message: `provided category(${category}) not exist in system`,
            status: 404,
        });
    }
    let subCategory = await subCategoryModel_1.SubCategory.findOne({ slug: slug });
    if (subCategory) {
        return res.status(403).json({
            success: false,
            message: `SubCategory ${subCategory.title}'s slug already exists in system. please change slug or Name and try.`,
            status: 403,
        });
    }
    if (!title || !slug) {
        next(new utility_class_1.default("Please add Required fileds", 400));
    }
    const subCategoryCount = await subCategoryModel_1.SubCategory.countDocuments();
    let subCategoryIndex = (await subCategoryModel_1.SubCategory.find({ category: category }))
        .length;
    const uid = await (0, helpers_1.IDBuilder)("mongoDB");
    if (!uid) {
        return res.status(500).json({
            success: false,
            message: "uid creation failed; please try again or contact system admin.",
        });
    }
    subCategory = await subCategoryModel_1.SubCategory.create({
        _id: uid,
        menuHierarchy: subCategoryIndex,
        homeHierarchy: subCategoryCount,
        title: title,
        slug,
        // visibility,
        description,
        categoryType,
        keywords,
        createdBy: "ritik",
        category,
    });
    return res.status(201).json({
        success: true,
        message: `SubCategory ${subCategory.title} has been created`,
    });
});
exports.getAllSubCategory = (0, error_1.TryCatch)(async (req, res, next) => {
    const slug = req.query.slug || "";
    if (slug) {
        const subCategory = await subCategoryModel_1.SubCategory.findOne({ slug });
        if (!subCategory)
            return next(new utility_class_1.default("Invalid subCategory slug", 400));
        return res.status(200).json({
            success: true,
            subCategory,
        });
    }
    const subCategories = await subCategoryModel_1.SubCategory.find({});
    return res.status(200).json({
        success: true,
        subCategories,
    });
});
exports.getCategoryDetails = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const subCategory = await subCategoryModel_1.SubCategory.findById(id);
    if (!subCategory)
        return next(new utility_class_1.default("Invalid SubCategory id", 400));
    return res.status(200).json({
        success: true,
        subCategory,
    });
});
exports.deleteSubCategory = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const subCategory = await subCategoryModel_1.SubCategory.findById(id);
    if (!subCategory)
        return next(new utility_class_1.default("Invalid SubCategory id", 400));
    await subCategory.deleteOne();
    return res.status(200).json({
        success: true,
        message: "SubCategory Deleted Succesfully",
    });
});

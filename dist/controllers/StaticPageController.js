"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStaticPage = exports.getStaticPageDetails = exports.newStaticPage = void 0;
const staticPageModel_1 = require("../models/staticPageModel");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const error_1 = require("../middlewares/error");
exports.newStaticPage = (0, error_1.TryCatch)(async (req, res, next) => {
    const { title, content, slug, status, metaData } = req.body;
    if (!title || !slug || !content) {
        next(new utility_class_1.default("Please add Required fileds", 404));
    }
    let staticPages = await staticPageModel_1.StaticPage.findOne({ slug: slug });
    if (staticPages) {
        return res.status(403).json({
            success: false,
            message: `StaticPage slug already exists in system. please change slug or Name and try.`,
            status: 403,
        });
    }
    const staticPagesCount = await staticPageModel_1.StaticPage.countDocuments();
    staticPages = await staticPageModel_1.StaticPage.create({
        _id: staticPagesCount,
        title,
        content,
        slug,
        status,
        createdBy: "2",
        metaData: metaData,
    });
    return res.status(201).json({
        success: true,
        message: `StaticPage has been created`,
    });
});
exports.getStaticPageDetails = (0, error_1.TryCatch)(async (req, res, next) => {
    const id = req.params.id;
    const staticPage = await staticPageModel_1.StaticPage.findById(id);
    if (!staticPage)
        return next(new utility_class_1.default("Invalid SubCategory id", 400));
    return res.status(200).json({
        success: true,
        staticPage,
    });
});
exports.getAllStaticPage = (0, error_1.TryCatch)(async (req, res, next) => {
    const slug = req.query.slug || "";
    if (slug) {
        const staticPage = await staticPageModel_1.StaticPage.findOne({ slug });
        if (!staticPage)
            return next(new utility_class_1.default("Invalid subCategory slug", 400));
        return res.status(200).json({
            success: true,
            page: staticPage,
        });
    }
    const staticPages = await staticPageModel_1.StaticPage.find({});
    return res.status(200).json({
        success: true,
        pages: staticPages,
    });
});

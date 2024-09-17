"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idFor = exports.newUniqueId = void 0;
const uniqueIdModel_1 = require("../models/uniqueIdModel");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const error_1 = require("../middlewares/error");
exports.newUniqueId = (0, error_1.TryCatch)(async (req, res, next) => {
    try {
        const { idFor } = req.body;
        if (!idFor) {
            throw new utility_class_1.default("Please add counter key", 400);
        }
        let uniqueId = await uniqueIdModel_1.UniqueId.findOne({ idFor });
        if (uniqueId) {
            const uniqueIds = await uniqueIdModel_1.UniqueId.findOneAndUpdate({ idFor }, { $inc: { count: 1 } });
            return res.status(200).json({
                success: true,
                message: `uniqueId count has been updated for ${uniqueId?.idFor} `,
                uniqueIds,
                status: 200,
            });
        }
        uniqueId = await uniqueIdModel_1.UniqueId.create({
            _id: idFor,
            idFor,
            count: 1,
        });
        return res.status(201).json({
            success: true,
            message: `New uniqueId created successfully`,
        });
    }
    catch (error) {
        next(error); // Pass error to error handling middleware
    }
});
//test of load
exports.idFor = (0, error_1.TryCatch)(async (req, res, next) => {
    try {
        const uniqueIds = await uniqueIdModel_1.UniqueId.findOneAndUpdate({ idFor: "idFor" }, { $inc: { count: 1 } });
        return res.status(201).json({
            success: true,
            message: `New uniqueId had been update successfully`,
            uniqueIds,
        });
    }
    catch (error) {
        next(error); // Pass error to error handling middleware
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDBuilder = void 0;
const uniqueIdModel_1 = require("../models/uniqueIdModel");
//test of load
const IDBuilder = async (idFor) => {
    try {
        const uniqueIds = await uniqueIdModel_1.UniqueId.findByIdAndUpdate(idFor, {
            $inc: { count: 1 },
        });
        return uniqueIds?.count;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
};
exports.IDBuilder = IDBuilder;

"use strict";
// import { TransformedTag } from "@/types";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformedTags = exports.extractTexts = void 0;
const extractTexts = (data) => {
    return data.map((keyword) => keyword.text);
};
exports.extractTexts = extractTexts;
const transformedTags = (originalTags) => {
    console.log("og" + originalTags);
    const tags = originalTags?.map((tag) => ({
        id: tag._id,
        text: tag.name,
    }));
    console.log("tag" + tags);
    return tags;
};
exports.transformedTags = transformedTags;

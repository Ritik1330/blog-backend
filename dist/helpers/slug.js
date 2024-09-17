"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugBuilder = void 0;
const slugBuilder = async (e) => {
    let tempSlug = await e.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, "");
    tempSlug = await tempSlug.replace(/ /g, "-").toLowerCase();
    return tempSlug;
};
exports.slugBuilder = slugBuilder;

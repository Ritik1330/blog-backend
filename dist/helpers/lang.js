"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = void 0;
const languagedetect_1 = __importDefault(require("languagedetect"));
const lngDetector = new languagedetect_1.default();
const detectLanguage = async (input) => {
    //   try {
    // Detect up to 2 languages
    const predictedLanguages = await lngDetector.detect(input, 2);
    // Check if any languages were detected
    if (predictedLanguages.length > 0) {
        const mainLang = predictedLanguages[0];
        console.log(mainLang[0]); // Log the main language detected
        console.log(mainLang[0]); // Log the main language detected
        return mainLang[0]; // Return the main language code
    }
    else {
        console.log("No language detected");
        return undefined; // Return undefined if no languages detected
    }
    //   } catch (error) {
    //     console.error("Error detecting language:", error);
    //     return undefined;
    //   }
};
exports.detectLanguage = detectLanguage;

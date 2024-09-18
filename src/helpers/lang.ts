import LanguageDetect from "languagedetect";

const lngDetector = new LanguageDetect();

export const detectLanguage = async (
  input: string
): Promise<string | undefined> => {
  const predictedLanguages = await lngDetector.detect(input, 2);

  // Check if any languages were detected
  if (predictedLanguages.length > 0) {
    const mainLang = predictedLanguages[0];
    return mainLang[0]; // Return the main language code
  } else {
    return undefined; // Return undefined if no languages detected
  }
};

// import { TransformedTag } from "@/types";

export const extractTexts = (data: any[]): string[] => {
  return data.map((keyword) => keyword.text);
};

export const transformedTags = (originalTags: any[]): any[] => {
  console.log("og" + originalTags);
  const tags = originalTags?.map((tag) => ({
    id: tag._id,
    text: tag.name,
  }));
  console.log("tag" + tags);
  return tags;
};

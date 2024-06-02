import { NextFunction, Request, Response } from "express";

export interface newUserRequstBody {
  _id: string;
  name: string;
  email: string; 
  photo: string;
  role: string;
  gender: string;
  dob: Date;
}

export interface myParams {
  id: string;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

type Block = {
  type: string;
  data: Record<string, any>;
};
type ThumbImage = {
  title: string;
  credits: string;
  Url: string;
  // Other fields...
};

export type PostType = {
  title: string;
  summary?: string;
  thumbImage: ThumbImage;
  blocks: Block[];
  version: string;
  category: string[];
  tags: string[];
  author: string;
  // author: mongoose.Types.ObjectId;
  postType: string;
};
export type CategoryType = {
  name: string;
  slug: string;
  visibility?: string;
  showInHierarchy?: number;
  description?: string;
  sectionType?: "section";
  tags?: string[];
  createdBy:string;
};

type SubCategoryTypeAdditional = {
  category: String;
  categoryType?: "subsection";
};

export interface newUniqueIdRequestBody {
  _id?: string;
  idFor: string;
  count?: string;
  
}
export interface ImageType  {
  // _id: string;
  title: string;
  credits?: string;
  // url: string;
  updatedby?: string;
}

export type SubCategoryType = CategoryType & SubCategoryTypeAdditional;

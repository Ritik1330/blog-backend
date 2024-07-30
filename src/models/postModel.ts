import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

interface Block {
  id: string;
  type: string;
  data: any;
}

interface Content {
  time: string;
  blocks: Block[];
  version: string;
}

interface metaData {
  metatitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  index: boolean;
}
interface socialData {
  ogtitle?: string;
  ogImage?: string;
  hashtags?: string[];
}
interface schemaData {
  articleTypeSchema: "None" | "Article" | "NewsArticle" | "BlogPosting";
  otherSchema: {
    name: "None" | "FAQPage" | "JobPosting ";
    schemaData: any;
  };
}

interface ContentModel extends Document {
  title: string;
  summary?: string;
  description?: string;
  image: string | schemaData;
  content: Content;
  postType: "Article" | "Slide" | "Webstory" | "EPaper";
  primaryCategory: string;
  categories: string[];
  subcategories: string[];
  slug: string;
  tags: string[];
  authors?: string[];
  status: "Draft" | "Published" | "Archived";
  createdBy: string;
  updatedBy?: string[];
  publicAt?: Date;
  metaData?: metaData;
  socialData?: socialData;
  schemaData?: schemaData;
  views: number;
  version: number;
}

const schema: Schema = new Schema<ContentModel>(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    title: {
      type: String,
      required: [true, "Please enter Title"],
    },
    summary: String,
    description: String,
    image: {
      type: String,
      ref: "Image",
    },
    content: {
      time: { type: String, required: true },
      blocks: [
        {
          id: { type: String, required: true },
          type: { type: String, required: true },
          data: { type: Schema.Types.Mixed, required: true },
        },
      ],
      version: { type: String, required: true },
    },
    postType: {
      type: String,
      enum: ["Article", "Slide", "Webstory", "EPaper"],
      required: true,
    },
    primaryCategory: {
      type: String,
      required: [true, "Please enter Main Category"],
    },
    categories: {
      type: [String],
      required: [true, "Please enter Category"],
    },
    subcategories: {
      type: [String],
      required: [true, "Please enter SubCategory"],
    },
    slug: {
      type: String,
      required: [true, "Please enter Name"],
    },
    tags: {
      type: [String],
      required: [true, "Please enter tags"],
      ref: "Tag",
    },
    authors: [String],
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },

    createdBy: {
      type: String,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: [String],
      ref: "User",
    },
    publicAt: {
      type: Date,
      default: Date.now,
    },
    metaData: {
      metatitle: String,
      metaDescription: String,
      keywords: [String],
      canonicalUrl: {
        type: String,
      },
      index: {
        type: Boolean,
        default: true,
      },
    },
    socialData: {
      ogtitle: String,
      ogImage: String,
      hashtags: [String],
    },
    schemaData: {
      articleTypeSchema: {
        type: String,
        enum: ["None", "Article", "NewsArticle", "BlogPosting"],
        default: "None",
      },
      otherSchema: {
        type: String,
        enum: ["None", "FAQPage", "JobPosting"],
        schemaData: Schema.Types.Mixed,
        default: "None",
      },
    },
    views: Number,
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model<ContentModel>("Post", schema);

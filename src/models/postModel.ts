import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

interface Block {
  type: string;
  data: Record<string, any>;
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
  type?: string;
  key?: string;
  data?: Record<string, any>[];
}

interface ContentModel extends Document {
  title: string;
  summary?: string;
  description?: string;
  image: string;
  blocks: Block[];
  type: "article" | "slide" | "webstory" | "ePaper";
  categories: string[];
  subcategories: string[];
  slug: string;
  tags: string[];
  author?: string[];
  status: "draft" | "published" | "archived";
  createdBy: string;
  updatedBy?: string[];
  publicAt?: Date;
  metadata?: metaData;
  socialData?: socialData;
  schemaData?: schemaData[];
  views: string;
  version: string;
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
    blocks: [
      {
        type: {
          type: String,
          required: [true, "Please enter blocks type"],
        },
        data: {
          type: Schema.Types.Mixed,
          required: [true, "Please enter blocks data"],
        },
      },
    ],
    type: {
      type: String,
      enum: ["article", "slide", "webstory", "ePaper"],
      required: true,
    },

    categories: {
      type: [String],
      required: [true, "Please enter Category"],
    },
    subcategories: {
      type: [String],
      required: [true, "Please enter Category"],
    },
    slug: {
      type: String,
      required: [true, "Please enter Name"],
    },
    tags: {
      type: [String],
      required: [true, "Please enter tags"],
    },

    author: [String],

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
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
    metadata: {
      metatitle: String,
      metaDescription: String,
      keywords: [String],
      canonicalUrl: {
        type: String,
        unique: [true, "thumbImage Url already Exist"],
        required: [true, "Please enter Name"],
        validate: validator.default.isURL,
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
    schemaData: [
      {
        type: String,
        key: String,
        data: [Schema.Types.Mixed],
      },
    ],
    views: String,
    version: {
      type: String,
      default: "1",
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model<ContentModel>("Post", schema);

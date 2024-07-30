import mongoose, { Schema, Document } from "mongoose";

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

interface StaticPageModel extends Document {
  title: string;
  content: Content;
  slug: string;
  status: "Public" | "Private";
  createdBy: string;
  updatedBy?: string[];
  metaData?:metaData
}

const schema: Schema = new Schema<StaticPageModel>(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    title: {
      type: String,
      required: [true, "Please enter Title"],
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
    slug: {
      type: String,
      required: [true, "Please enter Name"],
    },
    status: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
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
    createdBy: {
      type: String,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: [String],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const StaticPage = mongoose.model<StaticPageModel>("Static", schema);

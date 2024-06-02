import mongoose, { Document } from "mongoose";

interface SubCategoryType extends Document {
  _id: string;
  name: string;
  slug: string;
  visibility?: String;
  displayID?: number;
  description?: string;
  sectionType: "subsection";
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const subCategorySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    slug: {
      type: String,
      required: [true, "Please enter Slug"],
      unique: true,
    },
    displayID: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: String,
      enum: ["hamburger_menu", "main_menu", "both", "null"],
      default: "both",
    },
    description: {
      type: String,
    },
    sectionType: {
      type: String,
      default: "subsection",
    },
    category: {
      type: String,
      ref: "Category",
      required: [true, "Please enter Category"],
    },
    tags: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const SubCategory = mongoose.model<SubCategoryType>(
  "SubCategory",
  subCategorySchema
);

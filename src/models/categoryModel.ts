import mongoose, { Document, Schema } from "mongoose";

interface CategoryType extends Document {
  _id: string;
  title: string;
  slug: string;
  visibility?: "hamburgerMenu" | "mainMenu" | "both" | null;
  menuHierarchy?: number;
  homeHierarchy?: number;
  description?: string;
  categoryType: "section";
  keywords?: string[];
  createdBy: string;
  updatedBy?: string[];
  status: "active" | "inactive";
}

const categorySchema = new Schema<CategoryType>(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    title: {
      type: String,
      required: [true, "Please enter Name"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Please enter Slug"],
      unique: true,
    },
    description: {
      type: String,
    },
    keywords: {
      type: [String],
    },
    menuHierarchy: {
      type: Number,
      unique: true,
      required: [
        true,
        "Please enter the Menu Bar Hierarchy or connect with the system administrator.",
      ],
    },
    homeHierarchy: {
      type: Number,
      unique: true,
      required: [true, "Please enter Home Hierarchy"],
    },
    visibility: {
      type: String,
      enum: ["hamburgerMenu", "mainMenu", "both", null],
      default: "both",
    },
    categoryType: {
      type: String,
      default: "section",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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

export const Category = mongoose.model<CategoryType>(
  "Category",
  categorySchema
);

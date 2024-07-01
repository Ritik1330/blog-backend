import mongoose, { Document, Schema } from "mongoose";

interface SubCategoryType extends Document {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  category: string;
  visibility?: "hamburgerMenu" | "mainMenu" | "both" | null;
  menuHierarchy?: number;
  homeHierarchy?: number;
  categoryType: "subSection";
  keywords?: string[];
  createdBy: string;
  updatedBy?: string[];
  status: "active" | "inactive";
}

const SubCategorySchema = new Schema<SubCategoryType>(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    name: {
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
    category: {
      type: String,
      ref: "Category",
      required: [true, "Please enter Category"],
    },
    menuHierarchy: {
      type: Number,
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
      default: "subSection",
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

export const SubCategory = mongoose.model<SubCategoryType>(
  "SubCategory",
  SubCategorySchema
);

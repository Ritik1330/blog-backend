import mongoose, { Document, Schema } from "mongoose";

interface CategoryType extends Document {
  _id: string;
  name: string;
  slug: string;
  visibility?: "hamburger_menu" | "main_menu" | "both";
  menuHierarchy?: number;
  homeHierarchy?: number;
  description?: string;
  categoryType: "section";
  tags?: string[];
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
      enum: ["hamburger_menu", "main_menu", "both", null],
      default: "both",
    },

    categoryType: {
      type: String,
      default: "section",
    },
    tags: {
      type: [String],
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

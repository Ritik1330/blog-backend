import mongoose, { Document, Schema } from "mongoose";

interface TagType extends Document {
  _id: string;
  name: string;
}

const tagSchema = new Schema<TagType>(
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
  },
  {
    timestamps: true,
  }
);

export const Tag = mongoose.model<TagType>("Tag", tagSchema);

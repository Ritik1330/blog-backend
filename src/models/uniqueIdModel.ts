import mongoose, { Document } from "mongoose";

interface uniqueIdType extends Document {
  _id: string;
  idFor: string;
  count: number;
}

const uniqueIdSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    idFor: {
      type: String,
      required: [true, "Please enter idFor"],
    },
    count: {
      type: Number,
      required: [true, "Please enter count"],
    },
  },
  {
    timestamps: true,
  }
);

export const UniqueId = mongoose.model<uniqueIdType>(
  "uniqueId",
  uniqueIdSchema
);

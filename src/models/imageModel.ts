import mongoose, { Schema, Document } from "mongoose";

interface Image extends Document {
  _id: string;
  storage: string;
  title: string;
  credits?: string;
  url: string;
  updatedby: string;
}

const ImageSchema: Schema<Image> = new Schema(
  {
    _id: {
      type: String,
      required: [true, "A unique image ID is required"],
    },
    storage: {
      type: String,
      required: [true, "Please enter the storage origin."],
    },
    title: {
      type: String,
      required: [true, "Please enter image title"],
    },
    url: {
      type: String,
      unique: true,
      required: [true, "Please enter the URL"],
      validate: {
        validator: function (v: string) {
          // Simple URL validation regex, you might need a more robust one
          return /.(jpeg|jpg|gif|png|webp)$/i.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid URL for an image!`,
      },
    },
    credits: {
      type: String,
    },
    updatedby: {
      type: String,
      required: [true, "Please enter updatedby"],
    },
  },
  {
    timestamps: true,
  }
);



export const Image = mongoose.model<Image>(
  "Image",
  ImageSchema
);


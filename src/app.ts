import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { connectDb } from "./utils/features";
import { errorMiddleware } from "./middlewares/error";
import userRoute from "./routes/user.Routes";
import postRoutes from "./routes/post.Routes";
import categoryRoutes from "./routes/category.Routes";
import subCategoryRoutes from "./routes/subCategory.Routes";
import uniqueIdRoutes from "./routes/uniqueId.Routes";
import imageRoutes from "./routes/image.Routes";
import translaterRoutes from "./routes/translater.Routes";
import tagRoutes from "./routes/tag.Routes";
import StaticPageRoutes from "./routes/StaticPage.Routes";
import { config } from "dotenv";
import cors from "cors";

// import { config } from "../";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
connectDb();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", userRoute);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/subCategory", subCategoryRoutes);
app.use("/api/v1/uniqueid", uniqueIdRoutes);
app.use("/api/v1/", imageRoutes);
app.use("/api/v1", translaterRoutes);
app.use("/api/v1/tag", tagRoutes);
app.use("/api/v1/staticPages", StaticPageRoutes);

app.use("/uploads", express.static("uploads"));
app.get('/', (req, res) => {
  res.send('api working on => "/api/v1"')
})
app.use(errorMiddleware);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port, () => {
  console.log(`server is working on ${port}...`);
});

import express from "express";
import { connectDb } from "./utils/features";
import { errorMiddleware } from "./middlewares/error";
import userRoute from "./routes/user.Routes";
import postRoutes from "./routes/post.Routes";
import categoryRoutes from "./routes/category.Routes";
import subCategoryRoutes from "./routes/subCategory.Routes";
import uniqueIdRoutes from "./routes/uniqueId.Routes";
import fileRoutes from "./routes/file.Routes";
import translaterRoutes from "./routes/translater.Routes";
import tagRoutes from "./routes/tag.Routes";
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
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/subCategory", subCategoryRoutes);
app.use("/api/v1/uniqueid", uniqueIdRoutes);
app.use("/api/v1/", fileRoutes);
app.use("/api/v1", translaterRoutes);
app.use("/api/v1/tag", tagRoutes);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is working on ${port}...`);
});

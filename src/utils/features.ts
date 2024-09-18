import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    // .connect("mongodb://localhost:27017", { dbName: "blogAppDb" })

    .connect(process.env.MONGODBURL || "")
    .then((c) => console.log(`mogo Db connected on👌 => ${c.connection.host}`))
    .catch((e) => console.log(`mogoDb not connected due to 👎 ${e}`));
};

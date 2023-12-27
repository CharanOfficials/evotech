import express from "express";
import dotenv from "dotenv";
import { connectUsingMongoose } from "./config/mongoose.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router/index.router.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

const startServer = async () => {
  try {
    await connectUsingMongoose();
    app.listen(3000, () => {
      console.log("Server is listening at port no. 3000");
    });
  } catch (error) {
    console.error("An error occurred:", error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};
startServer();

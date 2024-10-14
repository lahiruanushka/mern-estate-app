import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoter from "./routes/user.route.js";

const port = 3000;
const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log(error);
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

app.use("/api/user", userRoter);

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import { allRoutes } from "./routes/allRoutes.js";

config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.error(err));

app.use("/api/auth", allRoutes);

cron.schedule("0 0 1 * *", async () => {
  console.log("Running the task to reset booked status.");
  try {
    await mongoose.connect(process.env.MONGO_URL);
    require("./resetBatchStatus.js");
  } catch (error) {
    console.error("Error running the task:", error.message);
  }
});

app.listen(port, () => console.log(`listening on ${port}`));

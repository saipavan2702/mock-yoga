import mongoose from "mongoose";
import Data from "./models/db";

const resetBookedStatus = async () => {
  try {
    await Data.updateMany({}, { $set: { payMentStatus: false } });
    console.log("Booked status reset successfully.");
  } catch (error) {
    console.error("Error resetting booked status:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

resetBookedStatus();

import Data from "./models/db.js";

export const resetPaymentStatus = async () => {
  try {
    await Data.updateMany({}, { paymentStatus: false });
    console.log("Booked status reset successfully.");
  } catch (error) {
    console.error("Error resetting booked status:", error.message);
  }
};

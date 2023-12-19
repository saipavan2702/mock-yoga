import Data from "./models/db.js";

export const resetPaymentStatus = async () => {
  try {
    await Data.updateMany(
      {
        $expr: {
          $gte: [
            { $subtract: ["$lastUpdated", new Date()] },
            30 * 24 * 60 * 60 * 1000,
          ],
        },
      },
      { $set: { paymentStatus: false, updatedDate: new Date() } }
    );
  } catch (error) {
    console.error("Error resetting booked status:", error.message);
  }
};

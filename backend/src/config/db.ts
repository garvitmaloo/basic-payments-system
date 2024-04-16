import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
  try {
    if (process.env.MONGO_URI !== undefined) {
      await mongoose.connect(process.env.MONGO_URI);
    } else {
      throw new Error("MONGO_URI is missing in environment variables.");
    }
  } catch (err) {
    throw err as Error;
  }
};

export default connectToDB;

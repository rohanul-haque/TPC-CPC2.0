import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    if (!process.env.DATABASE_CONNECTION_URL) {
      throw new Error(
        "DATABASE_CONNECTION_URL is not defined in environment variables"
      );
    }

    await mongoose.connect(`${process.env.DATABASE_CONNECTION_URL}/tpi-cpc`);

    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed");
  }
};

export default ConnectDB;

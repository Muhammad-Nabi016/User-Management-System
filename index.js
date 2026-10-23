
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function testMongoDBConnection() {
  try {
    console.log("Connecting to MongoDB Atlas...");

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI .env file mein nahi mili.");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000
    });

    console.log("Connected to MongoDB Atlas!");

    console.log(
      `Database "${mongoose.connection.name}" is ready!`
    );

  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  } finally {
    await mongoose.disconnect().catch(() => {});
    console.log("Connection test finished.");
  }
}

testMongoDBConnection();

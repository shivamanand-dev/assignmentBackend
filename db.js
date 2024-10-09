const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoURL = process.env.DB_CONNECT_STRING;

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectMongo;

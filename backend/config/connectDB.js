const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Server Run On ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
  }
};
module.exports = connectDB;

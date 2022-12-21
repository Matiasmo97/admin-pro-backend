const mongoose = require("mongoose");
require("dotenv").config();

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectionDB,
};

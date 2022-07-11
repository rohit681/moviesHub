require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(process.env.URL, () => {
    console.log("connected successfully");
  });
};

module.exports = connectToMongo;

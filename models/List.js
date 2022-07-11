const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  poster: {
    type: String,
  },
  List: {
    type: [String],
  },

  type: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("lists", listSchema);

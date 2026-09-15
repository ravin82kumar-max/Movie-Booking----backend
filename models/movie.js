const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: Number,
  genre: String,
  language: String,
  poster: String
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);

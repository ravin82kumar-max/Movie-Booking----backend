const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  theatre: String,
  time: String,
  price: Number,
  bookedSeats: [String]
}, { timestamps: true });

module.exports = mongoose.model("Show", showSchema);

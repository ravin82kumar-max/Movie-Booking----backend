const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userName: String,
  showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show" },
  seats: [String],
  totalPrice: Number
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);

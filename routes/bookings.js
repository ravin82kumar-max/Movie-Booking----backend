const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Show = require("../models/show");

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.post("/", async (req, res) => {
  const { showId, seats, userName } = req.body;
  const show = await Show.findById(showId);
  if (!show) return res.status(404).json({ message: "Show not found" });

  // check availability
  for (let s of seats) {
    if (show.bookedSeats.includes(s)) {
      return res.status(400).json({ message: `Seat ${s} already booked` });
    }
  }

  show.bookedSeats.push(...seats);
  await show.save();

  const booking = new Booking({ userName, showId, seats, totalPrice: seats.length * (show.price || 0) });
  await booking.save();
  res.json(booking);
});

module.exports = router;

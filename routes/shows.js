const express = require("express");
const router = express.Router();
const Show = require("../models/show");

const sampleShows = [
  { _id: "demo-show-1", movieId: "demo-1", theatre: "Grand Cinema", time: new Date(Date.now() + 86400000).toISOString(), price: 12, bookedSeats: [] },
  { _id: "demo-show-2", movieId: "demo-1", theatre: "Grand Cinema", time: new Date(Date.now() + 3 * 86400000 + 2 * 3600000).toISOString(), price: 14, bookedSeats: [] },
  { _id: "demo-show-3", movieId: "demo-2", theatre: "Downtown Theatre", time: new Date(Date.now() + 2 * 86400000 + 3 * 3600000).toISOString(), price: 10, bookedSeats: [] },
  { _id: "demo-show-4", movieId: "demo-2", theatre: "Downtown Theatre", time: new Date(Date.now() + 4 * 86400000 + 5 * 3600000).toISOString(), price: 11, bookedSeats: [] },
  { _id: "demo-show-5", movieId: "demo-3", theatre: "City Lights", time: new Date(Date.now() + 86400000 + 6 * 3600000).toISOString(), price: 9, bookedSeats: [] },
  { _id: "demo-show-6", movieId: "demo-3", theatre: "City Lights", time: new Date(Date.now() + 5 * 86400000 + 2 * 3600000).toISOString(), price: 12, bookedSeats: [] },
  { _id: "demo-show-7", movieId: "demo-4", theatre: "Royal Screen", time: new Date(Date.now() + 2 * 86400000 + 8 * 3600000).toISOString(), price: 13, bookedSeats: [] },
  { _id: "demo-show-8", movieId: "demo-5", theatre: "Silver Star", time: new Date(Date.now() + 3 * 86400000 + 7 * 3600000).toISOString(), price: 15, bookedSeats: [] }
];

router.get("/", async (req, res) => {
  try {
    const shows = await Show.find();
    if (shows && shows.length > 0) {
      return res.json(shows);
    }
    return res.json(sampleShows);
  } catch (error) {
    console.error("Show fetch failed, returning sample data:", error.message);
    return res.json(sampleShows);
  }
});

router.get("/movie/:movieId", async (req, res) => {
  try {
    const shows = await Show.find({ movieId: req.params.movieId });
    if (shows && shows.length > 0) {
      return res.json(shows);
    }
    const filtered = sampleShows.filter(show => String(show.movieId) === String(req.params.movieId));
    return res.json(filtered);
  } catch (error) {
    const filtered = sampleShows.filter(show => String(show.movieId) === String(req.params.movieId));
    return res.json(filtered);
  }
});

router.post("/", async (req, res) => {
  const show = new Show(req.body);
  await show.save();
  res.json(show);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Show = require("../models/show");

router.get("/", async (req, res) => {
  const shows = await Show.find();
  res.json(shows);
});

router.get("/movie/:movieId", async (req, res) => {
  const shows = await Show.find({ movieId: req.params.movieId });
  res.json(shows);
});

router.post("/", async (req, res) => {
  const show = new Show(req.body);
  await show.save();
  res.json(show);
});

module.exports = router;

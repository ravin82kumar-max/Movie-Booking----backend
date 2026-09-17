const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

const sampleMovies = [
  {
    _id: "demo-1",
    title: "Neon Horizon",
    description: "A stylish sci-fi adventure with a daring heist across a glowing city.",
    duration: 128,
    genre: "Sci-Fi",
    language: "English",
    poster: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "demo-2",
    title: "Sunset Circuit",
    description: "A heartwarming road-trip comedy packed with music and unexpected twists.",
    duration: 102,
    genre: "Comedy",
    language: "English",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "demo-3",
    title: "Midnight Parade",
    description: "An emotional mystery about a small town and the secrets hidden in its lantern festival.",
    duration: 115,
    genre: "Mystery",
    language: "English",
    poster: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "demo-4",
    title: "The Last Lantern",
    description: "A historical drama where an unlikely hero restores hope in a fading kingdom.",
    duration: 137,
    genre: "Drama",
    language: "Hindi",
    poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "demo-5",
    title: "Thunder in the Valley",
    description: "A thrilling action drama set against a stormy mountain rescue mission.",
    duration: 121,
    genre: "Action",
    language: "Tamil",
    poster: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80"
  }
];

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    if (movies && movies.length > 0) {
      return res.json(movies);
    }
    return res.json(sampleMovies);
  } catch (error) {
    console.error("Movie fetch failed, returning sample data:", error.message);
    return res.json(sampleMovies);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      return res.json(movie);
    }
    const fallback = sampleMovies.find(item => item._id === req.params.id);
    return fallback ? res.json(fallback) : res.status(404).json({ message: "Movie not found" });
  } catch (error) {
    const fallback = sampleMovies.find(item => item._id === req.params.id);
    return fallback ? res.json(fallback) : res.status(404).json({ message: "Movie not found" });
  }
});

router.post("/", async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

module.exports = router;

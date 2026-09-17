require("dotenv").config();

const mongoose = require("mongoose");
const Movie = require("./models/movie");
const Show = require("./models/show");

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/movieDB";

function buildShowTime(daysFromNow, hour, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

async function seed() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB for seeding");

  await Movie.deleteMany({});
  await Show.deleteMany({});

  const createdMovies = await Movie.create([
    {
      title: "Demo Movie: Neon Horizon",
      description: "A stylish sci-fi adventure with a daring heist across a glowing city.",
      duration: 128,
      genre: "Sci-Fi",
      language: "English",
      poster: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Demo Movie: Sunset Circuit",
      description: "A heartwarming road-trip comedy packed with music and unexpected twists.",
      duration: 102,
      genre: "Comedy",
      language: "English",
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Demo Movie: Midnight Parade",
      description: "An emotional mystery about a small town and the secrets hidden in its lantern festival.",
      duration: 115,
      genre: "Mystery",
      language: "English",
      poster: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80"
    }
  ]);

  const movieMap = Object.fromEntries(createdMovies.map((movie) => [movie.title, movie]));

  await Show.create([
    { movieId: movieMap["Demo Movie: Neon Horizon"]._id, theatre: "Grand Cinema", time: buildShowTime(0, 18, 30), price: 12, bookedSeats: [] },
    { movieId: movieMap["Demo Movie: Neon Horizon"]._id, theatre: "Grand Cinema", time: buildShowTime(2, 20, 0), price: 14, bookedSeats: [] },
    { movieId: movieMap["Demo Movie: Sunset Circuit"]._id, theatre: "Downtown Theatre", time: buildShowTime(1, 19, 0), price: 10, bookedSeats: [] },
    { movieId: movieMap["Demo Movie: Sunset Circuit"]._id, theatre: "Downtown Theatre", time: buildShowTime(3, 21, 30), price: 11, bookedSeats: [] },
    { movieId: movieMap["Demo Movie: Midnight Parade"]._id, theatre: "City Lights", time: buildShowTime(1, 17, 45), price: 9, bookedSeats: [] },
    { movieId: movieMap["Demo Movie: Midnight Parade"]._id, theatre: "City Lights", time: buildShowTime(4, 20, 15), price: 13, bookedSeats: [] }
  ]);

  console.log("Seed data created with demo movies and sample show dates");
  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

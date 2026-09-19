require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/movies", require("./routes/movies"));
app.use("/api/shows", require("./routes/shows"));
app.use("/api/bookings", require("./routes/bookings"));

const atlasMongo = "mongodb+srv://ravin82kumar_db_user:Ravin2006@cinema-booking.avnd3y2.mongodb.net/?appName=cinema-booking";
const primaryMongo = process.env.MONGO_URI || atlasMongo;
const fallbackMongo = atlasMongo;

async function connectMongo() {
  const attempts = [primaryMongo, fallbackMongo];

  for (const mongoUrl of attempts) {
    try {
      await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log(`MongoDB connected to ${mongoUrl}`);
      return;
    } catch (err) {
      console.warn(`MongoDB connection failed for ${mongoUrl}:`, err.message);
    }
  }

  console.warn("MongoDB is unavailable. The app will continue with sample/demo data.");
}

connectMongo();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

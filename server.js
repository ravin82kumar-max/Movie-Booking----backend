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

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/movieDB";
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

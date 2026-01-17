const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- TEST ---------------- */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ---------------- MOVIES ---------------- */
const movies = [
  { id: 1, title: "Avengers", price: 250 },
  { id: 2, title: "Inception", price: 200 },
  { id: 3, title: "Interstellar", price: 220 }
];

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

/* ---------------- CINEMAS ---------------- */
const cinemas = [
  "PVR Cinemas",
  "INOX",
  "Cinepolis",
  "Carnival Cinemas"
];

app.get("/api/cinemas", (req, res) => {
  res.json(cinemas);
});

/* ---------------- SHOWS ---------------- */
app.get("/api/shows", (req, res) => {
  const { movieId, cinema } = req.query;
  res.json(["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"]);
});

/* ---------------- SEATS ---------------- */
let bookedSeats = {}; 
// key: movieId_cinema_showtime

app.get("/api/seats", (req, res) => {
  const { movieId, cinema, showtime } = req.query;
  const key = `${movieId}_${cinema}_${showtime}`;
  res.json(bookedSeats[key] || []);
});

app.post("/api/seats/book", (req, res) => {
  const { movieId, cinema, showtime, seats } = req.body;
  const key = `${movieId}_${cinema}_${showtime}`;

  if (!bookedSeats[key]) bookedSeats[key] = [];

  bookedSeats[key] = [...new Set([...bookedSeats[key], ...seats])];

  res.json({
    message: "Seats booked successfully",
    bookedSeats: bookedSeats[key]
  });
});

/* ---------------- PAYMENT ---------------- */
app.post("/api/payment", (req, res) => {
  res.json({
    status: "success",
    message: "Payment successful 🎉"
  });
});

/* ---------------- SERVER ---------------- */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

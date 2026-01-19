import React, { useEffect, useState } from "react";

const Shows = ({ selectedMovie, selectedCinema, selectShowtime, navigateBack }) => {
  const [showTimings, setShowTimings] = useState([]);

  /* 🔗 FETCH SHOWTIMES FROM BACKEND */
  useEffect(() => {
    if (!selectedMovie || !selectedCinema) return;

    fetch(
      `http://localhost:5000/api/shows?movieId=${selectedMovie.id}&cinema=${selectedCinema}`
    )
      .then(res => res.json())
      .then(data => setShowTimings(data))
      .catch(err => console.error(err));
  }, [selectedMovie, selectedCinema]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Select Show Time</h1>
      <p className="text-yellow-400 mb-8 text-center">
        {selectedMovie?.title} @ {selectedCinema}
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {showTimings.map((time, idx) => (
          <div
            key={idx}
            onClick={() => selectShowtime(time)}
            className="show-card shadow-2xl"
          >
            {time}
          </div>
        ))}
      </div>

      <button
        onClick={navigateBack}
        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors"
      >
        ← Back to Cinemas
      </button>
    </div>
  );
};

export default Shows;

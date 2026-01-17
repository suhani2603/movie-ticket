import React from "react";

const Cinemas = ({ selectedMovie, selectCinema, navigateBack }) => {
  const movieName = selectedMovie?.title;

  const cinemas = [
    { name: "Sarv Cinemas", distance: "2.5 km" },
    { name: "Gold Multiplex (IMAX)", distance: "5.1 km" },
    { name: "Meher Cineplex", distance: "0.9 km" },
  ];

  if (!movieName) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Oops! Please select a movie first.
        </h1>
        <button
          className="py-3 px-8 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg text-lg transition duration-200 shadow-xl"
          onClick={navigateBack}
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-3 text-white text-center">
        Select Cinema
      </h1>
      <p className="text-xl font-semibold mb-10 text-yellow-400 text-center">
        Showing: {movieName}
      </p>

      <div className="cinema-cards flex flex-col items-center gap-6 w-full max-w-xl">
        {cinemas.map((cinema, index) => (
          <div
            key={index}
            // CHANGED CLASSES: Background is set to a deeper red (bg-red-800)
            className="cinema-card bg-red-800 p-6 rounded-xl shadow-2xl transition duration-300 ease-in-out transform hover:scale-[1.02] hover:bg-red-700 cursor-pointer border border-red-700 text-center"
            onClick={() => selectCinema(cinema.name)}
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              🍿 {cinema.name}
            </h2>
            <p className="text-red-400 font-medium mb-2">{cinema.distance} away</p>
            <p className="text-gray-200 mb-4">
              A great viewing experience with comfortable seating and superior sound.
            </p>
            <div className="flex justify-center gap-2 flex-wrap text-sm text-yellow-300">
              {/* Feature tags updated to match the even darker red theme (bg-red-900) */}
              <span className="bg-red-900 px-3 py-1 rounded-full">4K Projection</span> 
              <span className="bg-red-900 px-3 py-1 rounded-full">Recliners</span>
              {cinema.name.includes("IMAX") && (
                <span className="bg-red-900 px-3 py-1 rounded-full font-bold">IMAX</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-12 py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg"
        onClick={navigateBack}
      >
        &larr; Back
      </button>
    </div>
  );
};

export default Cinemas;
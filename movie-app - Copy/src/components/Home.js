import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/Bollywood-movie.jpg"; 

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";

const slideshowImages = [
  { src: img1, title: "Sholay" },
  { src: img2, title: "Avengers Endgame" },
  { src: img3, title: "Titanic" },
  { src: img4, title: "Ghajini" },
  { src: img5, title: "Lagaan" },
  { src: img6, title: "Mohabbatein" },
  { src: img7, title: "Chennai Express" },
  { src: img8, title: "Jab We Met" },
];

const BACKGROUND_URL = `url(${backgroundImage})`;

const Home = ({ selectMovie }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentMovie = slideshowImages[currentIndex];

  return (
    <div className="relative w-full min-h-screen"> 
      
      {/* Layer 2: FIXED BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 h-screen"
        style={{
          // Using the constant here
          backgroundImage: BACKGROUND_URL, 
        }}
      ></div>

      {/* Faded overlay removed to ensure visibility */}

      {/* Layer 4: SLIDESHOW CONTENT */}
      <div
        className="home-container relative flex flex-col items-center justify-center w-full z-10 h-full py-4"
      >
        <h1 className="text-4xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">
          FLASHBACK CINEMAS
        </h1>

        <img
          src={currentMovie.src}
          alt={currentMovie.title}
          className="rounded-xl shadow-2xl" 
          style={{
              width: '378px', 
              height: '382px', 
              objectFit: 'cover'
          }}
        />
        <h2 className="text-white text-xl font-bold mt-2 mb-1">
          {currentMovie.title}
        </h2>
        <button
          onClick={() => selectMovie(currentMovie)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg mt-2"
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};
export default Home;
import React from "react";

const Payment = ({ selectedMovie, selectedShowtime, selectedSeats, navigateBack }) => {
  const TICKET_PRICE = 150;
  const totalPrice = selectedSeats.length * TICKET_PRICE;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400 text-center">Payment Summary</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-4">
        <p><strong>Movie:</strong> {selectedMovie?.title}</p>
        <p><strong>Showtime:</strong> {selectedShowtime}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(", ") || "None"}</p>
        <p><strong>Price per ticket:</strong> ₹{TICKET_PRICE}</p>
        <hr className="border-gray-700" />
        <p className="text-xl font-bold text-center">Total: ₹{totalPrice}</p>

        <button
          onClick={() => alert("Payment Successful!")}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Pay Now
        </button>

        <button
          onClick={navigateBack}
          className="mt-2 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors"
        >
          ← Back to Seats
        </button>
      </div>
    </div>
  );
};

export default Payment;

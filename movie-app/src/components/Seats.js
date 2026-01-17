import React, { useEffect, useState } from "react";

const SEAT_PRICE = 150;

const SEAT_MAP = [
  "PP_PPPPPP_PP",
  "PPP_PPPPPP_PPP",
  "SSSSSS_SSSSSSS",
  "SSSSSS_SSSSSSS",
  "SSSSSS_SSSSSSS",
  "SSSSSS_SSSSSSS",
  "SSSSSS_SSSSSSS",
  "SSSSSS_SSSSSSS",
  "SSSSSS_SSSSSSS",
  "SSSSSS_SSSSSSS",
];

const ROW_LABELS = ["A","B","C","D","E","F","G","H","I","J"];

const Seats = ({
  selectedMovie,
  selectedShowtime,
  selectedSeats,
  setSelectedSeats,
  confirmSeats
}) => {

  const [reservedSeats, setReservedSeats] = useState([]);

  /* 🔗 FETCH RESERVED SEATS FROM BACKEND */
  useEffect(() => {
    if (!selectedMovie || !selectedShowtime) return;

    fetch(
      `http://localhost:5000/api/seats?movieId=${selectedMovie.id}&showtime=${selectedShowtime}`
    )
      .then(res => res.json())
      .then(data => setReservedSeats(data))
      .catch(err => console.error(err));
  }, [selectedMovie, selectedShowtime]);

  const handleSeatClick = (seatId) => {
    if (reservedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else if (selectedSeats.length < 10) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const renderSeat = (seatId, type) => {
    const isSelected = selectedSeats.includes(seatId);
    const isReserved = reservedSeats.includes(seatId);
    const typeClass = type === "P" ? "premium" : "standard";

    const classNames = `
      seat ${typeClass}
      ${isSelected ? "selected" : ""}
      ${isReserved ? "reserved" : ""}
    `;

    return (
      <div
        key={seatId}
        onClick={() => handleSeatClick(seatId)}
        className={classNames}
      >
        {seatId.split("-")[1]}
      </div>
    );
  };

  const renderRow = (row, rowIndex) => {
    const rowLabel = ROW_LABELS[rowIndex];
    let seatNumber = 1;

    let aisleSpacerStyle = { width: "92px" };
    if (rowLabel === "A") aisleSpacerStyle = { width: "138px" };
    else if (rowLabel === "B") aisleSpacerStyle = { width: "115px" };

    return (
      <div key={rowLabel} className="flex items-start mb-1">
        <div className="w-6 text-center font-bold text-yellow-400 mt-[10px]">
          {rowLabel}
        </div>

        <div className="seat-grid-row">
          {row.split("").map((seat, i) => {
            if (seat === "_") {
              return <div key={i} style={aisleSpacerStyle} />;
            }

            const seatId = `${rowLabel}-${seatNumber++}`;
            return renderSeat(seatId, seat);
          })}
        </div>
      </div>
    );
  };

  const totalCost = selectedSeats.length * SEAT_PRICE;

  /* 🔗 BOOK SEATS VIA BACKEND */
  const handleConfirm = async () => {
    await fetch("http://localhost:5000/api/seats/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId: selectedMovie.id,
        showtime: selectedShowtime,
        seats: selectedSeats
      })
    });

    confirmSeats();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">
        {selectedMovie?.title} - Seat Selection
      </h1>
      <p className="text-yellow-400 mb-8">{selectedShowtime}</p>

      <div className="w-full max-w-4xl bg-gray-700 text-center py-2 mb-10 rounded-lg">
        🎬 SCREEN
      </div>

      <div className="bg-gray-800 p-8 rounded-xl">
        {SEAT_MAP.map((row, index) => renderRow(row, index))}
      </div>

      <div className="mt-8 bg-gray-800 p-4 rounded-xl w-full max-w-md text-center">
        <p>Seats Selected: {selectedSeats.join(", ") || "None"}</p>
        <p className="text-xl font-bold mt-2">Total: ₹{totalCost}</p>

        <button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className="mt-4 px-6 py-2 bg-red-600 rounded-lg disabled:bg-gray-600"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Seats;

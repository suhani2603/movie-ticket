import React, { Component } from "react";
import Home from "./components/Home";
import Cinemas from "./components/Cinemas";
import Shows from "./components/Shows";
import Seats from "./components/Seats";
import Payment from "./components/Payment";
import "./App.css";

class App extends Component {
  state = {
    currentPage: "Home",
    selectedMovie: null,
    selectedCinema: null,
    selectedShowtime: null,
    selectedSeats: [],
  };

  // Navigation handlers
  selectMovie = (movie) => this.setState({ selectedMovie: movie, currentPage: "Cinemas" });
  selectCinema = (cinema) => this.setState({ selectedCinema: cinema, currentPage: "Shows" });
  selectShowtime = (showtime) => this.setState({ selectedShowtime: showtime, currentPage: "Seats", selectedSeats: [] });
  setSelectedSeats = (seats) => this.setState({ selectedSeats: seats });
  confirmSeats = () => this.setState({ currentPage: "Payment" });

  navigateBack = () => {
    const { currentPage } = this.state;
    if (currentPage === "Cinemas") this.setState({ currentPage: "Home" });
    else if (currentPage === "Shows") this.setState({ currentPage: "Cinemas" });
    else if (currentPage === "Seats") this.setState({ currentPage: "Shows" });
    else if (currentPage === "Payment") this.setState({ currentPage: "Seats" });
  };

  renderPage() {
    const { currentPage, selectedMovie, selectedCinema, selectedShowtime, selectedSeats } = this.state;

    if (currentPage === "Home") return <Home selectMovie={this.selectMovie} />;
    if (currentPage === "Cinemas")
      return <Cinemas selectedMovie={selectedMovie} selectCinema={this.selectCinema} navigateBack={this.navigateBack} />;
    if (currentPage === "Shows")
      return <Shows selectedMovie={selectedMovie} selectedCinema={selectedCinema} selectShowtime={this.selectShowtime} navigateBack={this.navigateBack} />;
    if (currentPage === "Seats")
      return <Seats selectedMovie={selectedMovie} selectedShowtime={selectedShowtime} selectedSeats={selectedSeats} setSelectedSeats={this.setSelectedSeats} confirmSeats={this.confirmSeats} />;
    if (currentPage === "Payment")
      return <Payment selectedMovie={selectedMovie} selectedShowtime={selectedShowtime} selectedSeats={selectedSeats} navigateBack={this.navigateBack} />;
  }

  render() {
    return <div className="App">{this.renderPage()}</div>;
  }
}

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./gamesSideBar.css";

export default function GamesSideBar() {
  const navigate = useNavigate();
  // Navigates to Sign Up Page
  function navigateTo(link) {
    navigate(link);
  }
  return (
    <div className="sidebar">
      <div className="box" onClick={() => navigateTo("/games")}>
        All Games
      </div>
      <div className="box" onClick={() => navigateTo("/games/tic_tac_toe")}>
        Tic Tac Toe
      </div>
      <div
        className="box"
        onClick={() => navigateTo("/games/stone_rock_cactus")}
      >
        Stone Rock Cactus
      </div>
      <div className="box" onClick={() => navigateTo("/games/wrestle_economy")}>
        Wrestle Economy
      </div>
      <div
        className="box"
        onClick={() => navigateTo("/games/kairi_ship_sails")}
      >
        Kairi Ship Sails
      </div>
      <div className="box" onClick={() => navigateTo("/games/damien")}>
        Damien
      </div>
      <div
        className="box"
        onClick={() => navigateTo("/games/chasing_the_dragon")}
      >
        Chasing The Dragon
      </div>
      <div className="box" onClick={() => navigateTo("/games/ring_breaker")}>
        Ring Breaker
      </div>
    </div>
  );
}

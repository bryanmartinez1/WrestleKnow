import React, { useState, useEffect } from "react";
import "./rockPaperScissors.css";
import paper from "../../../images/paper.png";
import rock from "../../../images/rock.png";
import scissors from "../../../images/scissors.png";

export default function RockPaperScissors() {
  const rpsChoices = ["rock", "paper", "scissors"];
  const [player1Choice, setPlayer1Choice] = useState("");
  const [compChoice, setCompChoice] = useState("");
  const [allResults, setResults] = useState("");

  function rpsGame() {
    let randomIndex = Math.floor(Math.random() * rpsChoices.length);
    setCompChoice(rpsChoices[randomIndex]);
  }

  useEffect(() => {
    if (player1Choice !== "" && compChoice !== "") {
      const winner = calculateWinner(player1Choice, compChoice);
      const currentResults =
        "Player chooses " +
        player1Choice +
        "Computer chooses " +
        compChoice +
        winner;
      setResults(allResults + currentResults);
    }
  }, [compChoice]);

  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  function calculateWinner(p1, p2) {
    if (p1 === p2) {
      return "It's a tie";
    } else if (winConditions[p1] === p2) {
      return "Player 1 wins";
    }

    return "Computer Wins";
  }
  return (
    <div className="rpsPage">
      <div className="rpsChoicesDiv">
        <img
          className="rpsImages"
          src={rock}
          alt="Rock"
          onClick={() => setPlayer1Choice(rpsChoices[0])}
        />
        <img
          className="rpsImages"
          src={paper}
          alt="Paper"
          onClick={() => setPlayer1Choice(rpsChoices[1])}
        />
        <img
          className="rpsImages"
          src={scissors}
          alt="Scissors"
          onClick={() => setPlayer1Choice(rpsChoices[2])}
        />
      </div>
      <button onClick={() => rpsGame()}>Confirm Choice</button>
      {allResults !== "" && <>Results</>}
      <> {allResults}</>
      <> Player chooses {player1Choice}</>
      <> Computer chooses {compChoice}</>
    </div>
  );
}

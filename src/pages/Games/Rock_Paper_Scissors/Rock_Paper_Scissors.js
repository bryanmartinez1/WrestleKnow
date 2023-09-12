import React, { useState } from "react";
import "./rockPaperScissors.css";
import paper from "../../../images/paper.png";
import rock from "../../../images/rock.png";
import scissors from "../../../images/scissors.png";

export default function RockPaperScissors() {
  const rpsChoices = ["rock", "paper", "scissors"];
  const [player1Choice, setPlayer1Choice] = useState("");
  const [compChoice, setCompChoice] = useState("");
  const [stringResults, setResults] = useState("");

  function rpsGame() {
    let randomIndex = Math.floor(Math.random() * rpsChoices.length);
    setCompChoice(rpsChoices[randomIndex]);
    setResults(
      stringResults +
        `Player chooses ${player1Choice}\nComputer chooses ${compChoice}\n`
    );
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
      {stringResults != "" && <div>Results</div>}
      <div> {stringResults}</div>
      <div> Player chooses {player1Choice}</div>
      <div> Computer chooses {compChoice}</div>
    </div>
  );
}

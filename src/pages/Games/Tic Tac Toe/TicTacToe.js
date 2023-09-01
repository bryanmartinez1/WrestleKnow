import React, { useEffect, useState } from "react";
import "./ticTacToe.css";

export default function TicTacToe() {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [cellValues, setCellValues] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isWinner, setWinner] = useState(0);
  function switchingPlayersTurn() {
    if (playerTurn === 1) {
      setPlayerTurn(2);
    } else {
      setPlayerTurn(1);
    }
  }

  function game(row, column) {
    if (cellValues[row][column] !== "") {
      alert("The Cell Chosen has already been picked");
      return;
    }

    let tempArray = cellValues;
    tempArray[row][column] = playerTurn;
    setCellValues(tempArray);
    switchingPlayersTurn();
    checkingWinCondtion(tempArray);
  }

  function checkingWinCondtion(array) {
    // Row Win Condition
    for (let i = 0; i < 3; i++) {
      if (array[i][0] === "") continue;
      if (array[i][0] === array[i][1] && array[i][0] === array[i][2]) {
        alert(array[i][0] + " is the winner");
        break;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (array[0][i] === "") continue;
      if (array[0][i] === array[1][i] && array[0][i] === array[2][i]) {
        alert(array[0][i] + " is the winner");
        break;
      }
    }

    if (
      array[0][0] === array[1][1] &&
      array[0][0] === array[2][2] &&
      array[0][0] !== ""
    ) {
      alert(array[0][0] + " is the winner");
    }
    if (
      array[0][2] === array[1][1] &&
      array[0][2] === array[2][0] &&
      array[0][2] !== ""
    ) {
      alert(array[0][2] + " is the winner");
    }
  }

  function clearBoard() {
    setCellValues([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setPlayerTurn(1);
  }

  return (
    <div id="tttContainer">
      <h1>Tic Tac Toe</h1>
      <div id="tttCellContainer">
        <div class="cell" onClick={() => game(0, 0)}>
          {cellValues[0][0]}
        </div>
        <div class="cell" onClick={() => game(0, 1)}>
          {cellValues[0][1]}
        </div>
        <div class="cell" onClick={() => game(0, 2)}>
          {cellValues[0][2]}
        </div>
        <div class="cell" onClick={() => game(1, 0)}>
          {cellValues[1][0]}
        </div>
        <div class="cell" onClick={() => game(1, 1)}>
          {cellValues[1][1]}
        </div>
        <div class="cell" onClick={() => game(1, 2)}>
          {cellValues[1][2]}
        </div>
        <div class="cell" onClick={() => game(2, 0)}>
          {cellValues[2][0]}
        </div>
        <div class="cell" onClick={() => game(2, 1)}>
          {cellValues[2][1]}
        </div>
        <div class="cell" onClick={() => game(2, 2)}>
          {cellValues[2][2]}
        </div>
      </div>
      <h2 id="statusText"></h2>
      <button id="restartButton" onClick={() => clearBoard()}>
        Restart
      </button>
    </div>
  );
}

import React, { useState } from "react";
import "./ticTacToe.css";

export default function TicTacToe() {
  const [playerTurn, setPlayerTurn] = useState("X");
  const [cellValues, setCellValues] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isWinner, setWinner] = useState("");
  function switchingPlayersTurn() {
    if (playerTurn === "X") {
      setPlayerTurn("O");
    } else {
      setPlayerTurn("X");
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
        setWinner("Player " + array[i][0] + " is the winner");
        disableGameAfterWinner();
        break;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (array[0][i] === "") continue;
      if (array[0][i] === array[1][i] && array[0][i] === array[2][i]) {
        setWinner("Player " + array[0][i] + " is the winner");
        disableGameAfterWinner();
        break;
      }
    }

    if (
      array[0][0] === array[1][1] &&
      array[0][0] === array[2][2] &&
      array[0][0] !== ""
    ) {
      setWinner("Player " + array[0][0] + " is the winner");
      disableGameAfterWinner();
    }
    if (
      array[0][2] === array[1][1] &&
      array[0][2] === array[2][0] &&
      array[0][2] !== ""
    ) {
      setWinner("Player " + array[0][2] + " is the winner");
      disableGameAfterWinner();
    }
  }

  function clearBoard() {
    setCellValues([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setPlayerTurn("X");
    setWinner("");
    var buttons = document.querySelectorAll("#tttCellContainer .cell");
    buttons.forEach(function (button) {
      button.disabled = false;
    });
  }

  function disableGameAfterWinner() {
    var buttons = document.querySelectorAll("#tttCellContainer .cell");
    buttons.forEach(function (button) {
      button.disabled = true;
    });
  }

  return (
    <div className="tictactoePage">
      <div id="tttContainer">
        <div className="gameTitle">Tic Tac Toe</div>
        <div className="statusText">{isWinner}</div>
        <div id="tttCellContainer">
          <button class="cell" onClick={() => game(0, 0)}>
            {cellValues[0][0]}
          </button>
          <button class="cell" onClick={() => game(0, 1)}>
            {cellValues[0][1]}
          </button>
          <button class="cell" onClick={() => game(0, 2)}>
            {cellValues[0][2]}
          </button>
          <button class="cell" onClick={() => game(1, 0)}>
            {cellValues[1][0]}
          </button>
          <button class="cell" onClick={() => game(1, 1)}>
            {cellValues[1][1]}
          </button>
          <button class="cell" onClick={() => game(1, 2)}>
            {cellValues[1][2]}
          </button>
          <button class="cell" onClick={() => game(2, 0)}>
            {cellValues[2][0]}
          </button>
          <button class="cell" onClick={() => game(2, 1)}>
            {cellValues[2][1]}
          </button>
          <button class="cell" onClick={() => game(2, 2)}>
            {cellValues[2][2]}
          </button>
        </div>
      </div>
      <button id="restartButton" onClick={() => clearBoard()}>
        Restart
      </button>
    </div>
  );
}

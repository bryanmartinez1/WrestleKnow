import React, { useState } from "react";
import "./styles/dropdown.css";

export default function Dropdown(props) {
  const [drop, setDrop] = useState("Active");
  function changeDrop(value) {
    switch (value) {
      case 0:
        setDrop("Active");
        props.setOption("Active");
        break;
      case 1:
        setDrop("Retire");
        props.setOption("Retire");
        break;
    }
    closeDrop();
  }

  // Dropdown Functions
  // Proper Implemnation to be Added
  // Functions to Open and Close Dropdown
  var dropOpened = false;
  //Function to Open Dropdown
  function openDrop() {
    document.getElementById("wrestlerdrop").style.display = "block";
    dropOpened = true;
  }
  //Function to Close Dropdown
  function closeDrop() {
    document.getElementById("wrestlerdrop").style.display = "none";
    dropOpened = false;
  }
  //puts the two together
  function dropOpenClose() {
    if (dropOpened === false) {
      openDrop();
    } else {
      closeDrop();
    }
  }
  return (
    <div className="sort-holder">
      <div className="dropdown">
        <button
          className="dropdown-wrestler-sort-button"
          onClick={() => dropOpenClose()}
        >
          {drop}
        </button>
        <div className="content-box" id="wrestlerdrop">
          <div className="option" onClick={() => changeDrop(0)}>
            Active
          </div>
          <div className="option" onClick={() => changeDrop(1)}>
            Retire
          </div>
        </div>
      </div>
    </div>
  );
}

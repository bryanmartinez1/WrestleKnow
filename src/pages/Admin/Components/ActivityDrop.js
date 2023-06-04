import React, { useState } from "react";
import "./styles/activityDrop.css";
import dd_open from "./images/dd-open.png";
import dd_close from "./images/dd-close.png";

export default function ActivityDrop(props) {
  const [drop, setDrop] = useState("Active");
  const [dropImg, setDropImg] = useState(dd_close);
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
    document.getElementById("activityDrop").style.display = "block";
    dropOpened = true;
    setDropImg(dd_close);
  }
  //Function to Close Dropdown
  function closeDrop() {
    document.getElementById("activityDrop").style.display = "none";
    dropOpened = false;
    setDropImg(dd_open);
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
    <div className="active-drop-holder">
      <div className="active-dropdown">
        <button
          className="dropdown-activity-but"
          onClick={() => dropOpenClose()}
        >
          {drop}
          <img className="dd-img" src={dropImg} />
        </button>
        <div className="activity-box" id="activityDrop">
          <div className="activity-option" onClick={() => changeDrop(0)}>
            Active
          </div>
          <div className="activity-option" onClick={() => changeDrop(1)}>
            Retire
          </div>
        </div>
      </div>
    </div>
  );
}

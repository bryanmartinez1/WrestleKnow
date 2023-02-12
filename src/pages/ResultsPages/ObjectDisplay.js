import React from "react";
import "./display.css";
import zayn from "./zayn.png";

export default function ObjectDisplay() {
  return (
    <div className="spacing">
      <div className="objectHolder">
        <img src={zayn} className="objectImg"></img>
        <div className="objectName">Sami Zayn</div>
        <div className="objectInfo">
          <div className="objectOther">Canada</div>
          <div className="objectOther">WWE</div>
          <div className="objectOther">6 ft 0 in</div>
        </div>
      </div>
    </div>
  );
}

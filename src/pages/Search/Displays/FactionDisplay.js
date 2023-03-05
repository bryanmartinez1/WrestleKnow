import React, { useState } from "react";
import "./styles/display.css";
import Parse from "parse/dist/parse.min.js";
import { Link } from "react-router-dom";

export default function FactionDisplay(props) {
  const [middleInfo, setMiddleInfo] = useState("Bruh");

  let compID = props.infoB.split('":"').pop().slice(0, -2);
  async function innerQuery() {
    let query = new Parse.Query(props.innerQuery);
    try {
      query.equalTo("objectId", compID);
      let results = await query.find();
      setMiddleInfo(results[0].get("shortName"));
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }
  innerQuery();
  console.log("Active: " + props.infoSTATUS);
  let imgSRC = JSON.stringify(props.imgSrc).split('url":"').pop().slice(0, -2);
  return (
    <div className="spacing">
      <Link className="link" to={props.link} state={{ id: props.objectId }}>
        <div className="objectHolder">
          <img src={imgSRC} className="objectImg"></img>
          <div className="objectName">{props.name}</div>
          <div className="objectInfo">
            <div className="objectOther">{props.infoSTATUS}</div>
            <div className="objectOther">{props.infoFROM}</div>
            <div className="objectOther">{middleInfo}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

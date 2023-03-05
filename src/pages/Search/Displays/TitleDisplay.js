import React, { useState } from "react";
import "./styles/display.css";
import Parse from "parse/dist/parse.min.js";
import { Link } from "react-router-dom";

export default function TitleDisplay(props) {
  const [middleInfo, setMiddleInfo] = useState();

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

  //Gets the Age from Date inserted
  let dob = props.infoDATE;
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();
  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);
  //extract year from date
  var year = age_dt.getUTCFullYear();
  //now calculate the age of the user
  var age = Math.abs(year - 1970);

  let imgSRC = JSON.stringify(props.imgSrc).split('url":"').pop().slice(0, -2);

  return (
    <div className="spacing">
      <Link className="link" to={props.link} state={{ id: props.objectId }}>
        <div className="objectHolder">
          <img src={imgSRC} className="objectImg"></img>
          <div className="objectName">{props.name}</div>
          <div className="objectInfo">
            <div className="objectOther">{props.infoA}</div>
            <div className="objectOther">{age}</div>
            <div className="objectOther">{middleInfo}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

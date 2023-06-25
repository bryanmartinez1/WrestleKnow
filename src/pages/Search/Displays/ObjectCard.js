import React from "react";
import "./styles/objectcard.css";
import { Link } from "react-router-dom";

export default function ObjectCard(props) {
  let dob = props.date;
  //calculate month difference from current date in time
  let month_diff = Date.now() - dob.getTime();
  //convert the calculated difference in date format
  let age_dt = new Date(month_diff);
  //extract year from date
  let year = age_dt.getUTCFullYear();
  //now calculate the age of the user
  let age = Math.abs(year - 1970);

  let image = JSON.stringify(props.imageSRC).split('url":"').pop().slice(0, -2);
  return (
    <div className="spacing">
      <Link
        className="linkDesign"
        to={props.link}
        state={{ id: props.objectID }}
      >
        <div className="objectHolder">
          <img src={image} className="objectImg"></img>
          <div className="objectName">{props.name}</div>
          <div className="objectInfo">
            <div className="objectOther">{props.infoA}</div>
            <div className="objectOther">{age}</div>
            <div className="objectOther">{props.active}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

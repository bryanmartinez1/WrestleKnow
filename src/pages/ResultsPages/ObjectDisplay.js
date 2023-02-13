import React, { useState } from "react";
import "./styles/display.css";
import Parse from "parse/dist/parse.min.js";

export default function ObjectDisplay(props) {
  const [company, setCompany] = useState();

  //Gets the Age from Date inserted
  let dob = props.infoC;
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();
  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);
  //extract year from date
  var year = age_dt.getUTCFullYear();
  //now calculate the age of the user
  var age = Math.abs(year - 1970);

  // Image of Object
  // Object is turn to a string then
  // Anything before and after the needed URL are removed
  let imgSRC = JSON.stringify(props.imgSrc).split('url":"').pop().slice(0, -2);

  // let infoB = props.infoB.get("name");
  // console.log("Bruh: " + infoB);
  let compID = props.infoB.split('":"').pop().slice(0, -2);
  async function innerQuery() {
    let query = new Parse.Query(props.innerQuery);
    try {
      query.equalTo("objectId", compID);
      let results = await query.find();
      setCompany(results[0].get("shortName"));
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }
  innerQuery();

  return (
    <div className="spacing">
      <div className="objectHolder">
        <img src={imgSRC} className="objectImg"></img>
        <div className="objectName">{props.name}</div>
        <div className="objectInfo">
          <div className="objectOther">{props.infoA}</div>
          <div className="objectOther">{company}</div>
          <div className="objectOther">{age}</div>
        </div>
      </div>
    </div>
  );
}

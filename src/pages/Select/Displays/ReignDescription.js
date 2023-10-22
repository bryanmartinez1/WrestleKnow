import React from "react";
import "./styles/reignDescription.css";
import image from "../../../images/tiktokLogo.png";

export default function ReignDescription(props) {
  //    Convert to Link thgat points to specfic title page when picture is clicked
  //    5 inputs
  //        Image
  //        Title Name
  //        Title Reign Start Date
  //        Title Reign End Date
  //        Title Id to Link to Next Page
  //    Code that computes total days with title End Date - Start Date

  return (
    <div className="reignDescriptionHolder">
      <img className="titleImage" src={image} alt="Title" />
      <div className="reignInfoHolder">
        <div className="reignDivider">
          <div className="div titleName">{props.name}</div>
          <div className="div titleWon">{props.firstInfo}</div>
          <div className="div titleLost">{props.secondInfo}</div>
          <div className="div titleTotalDays">{props.thridInfo}</div>
        </div>
      </div>
    </div>
  );
}

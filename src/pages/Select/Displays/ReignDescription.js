import React, { useEffect } from "react";
import "./reignDescription.css";
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
      <img className="titleImage" src={image} alt="Picture of Title" />
      <div className="reignInfoHolder">
        <div className="reignDivider">
          <div className="div titleName">Women’s Royal Rumble</div>
          <div className="div titleWon">January 27, 2019</div>
          <div className="div titleLost">January 27, 2019</div>
          <div className="div titleTotalDays">0 Days</div>
        </div>
      </div>
    </div>
  );
}

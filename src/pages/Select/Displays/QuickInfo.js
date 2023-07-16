import React from "react";
import "./styles/quickInfo.css";
import { Link } from "react-router-dom";

export default function QuickInfo(props) {
  return (
    <div className="quickInfoHolder">
      <img className="quickInfoIMG" src={props.imgSrc} />
      <Link
        className="holderBox"
        to={{
          pathname: `/company/${props.companyID}`,
          search: `?${encodeURIComponent(props.companyName)}`,
        }}
      >
        {props.companyName}
      </Link>
      <div class="horizontal-border" />
      <div className="holderBox">
        <div className="quickInfoContent">{props.topLeft}</div>
        <div className="quickInfoContent">{props.topRight}</div>
      </div>
      <div class="horizontal-border" />
      <div className="holderBox">
        <div className="quickInfoContent">{props.bottomLeft}</div>
        <div className="quickInfoContent">{props.bottomRight}</div>
      </div>
    </div>
  );
}

import React from "react";
import "./styles/nameDisplay.css";

export default function ReignDescription(props) {
  return <div className="nameDisplayHolder">{props.name}</div>;
}

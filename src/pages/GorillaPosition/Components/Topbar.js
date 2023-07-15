import React from "react";
import create from "./images/create_promo.png";
import "./styles/topbar.css";

export default function Topbar(props) {
  function createPromo() {
    alert("Promo Created");
  }
  return (
    <div className="topbarColor">
      <div className="nameBar">{props.name}</div>
      <img className="create" src={create} onClick={() => createPromo()}></img>
    </div>
  );
}

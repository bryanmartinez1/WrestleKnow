import React from "react";
import "./styles/input.css";

export default function Inputs(props) {
  return (
    <>
      <h1 className="header">{props.header}</h1>
      <input
        className="inputWidth"
        type="text"
        onChange={(event) => props.setHook(event.target.value)}
      />
    </>
  );
}

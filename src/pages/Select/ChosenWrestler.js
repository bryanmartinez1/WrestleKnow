import "./styles/cw.css";
import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ChosenWrestler() {
  const location = useLocation();
  const data = location.state;
  return <div className="displayBody">{data.id}</div>;
}

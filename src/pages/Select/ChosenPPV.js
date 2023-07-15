import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ChosenPPV() {
  const location = useLocation();
  const id = location.state.id;
  return <h1>ChosenPPV</h1>;
}

import React from "react";
import Parse from "parse/dist/parse.min.js";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ChosenTitle() {
  const location = useLocation();
  const id = location.state.id;
  return <h1>{id}</h1>;
}

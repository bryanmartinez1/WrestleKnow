import React, { useEffect, useState } from "react";
import "./Displays/styles/wrestler.css";
import Search from "./Displays/Search";

export default function Wrestler() {
  return <Search queryClass="Wrestler" chosenLink="/wrestler/chosenwrestler" />;
}

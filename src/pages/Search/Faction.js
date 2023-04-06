import React, { useEffect, useState } from "react";
import "./Displays/styles/wrestler.css";
import Search from "./Displays/Search";

export default function Faction() {
  return <Search queryClass="Faction" chosenLink="/faction/chosenfaction" />;
}

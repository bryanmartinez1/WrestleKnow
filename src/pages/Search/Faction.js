import React, { useEffect, useState } from "react";
import Search from "./Displays/Search";

export default function Faction() {
  return <Search queryClass="Faction" chosenLink="/faction/chosenfaction" />;
}

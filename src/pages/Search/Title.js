import React, { useEffect, useState } from "react";
import "./Displays/styles/wrestler.css";
import Search from "./Displays/Search";

export default function Title() {
  return <Search queryClass="Title" chosenLink="/title/chosentitle" />;
}

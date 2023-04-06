import React, { useEffect, useState } from "react";
import "./Displays/styles/wrestler.css";
import Search from "./Displays/Search";

export default function Company() {
  return <Search queryClass="Company" chosenLink="/company/chosencompany" />;
}

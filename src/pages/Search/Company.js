import React, { useEffect, useState } from "react";
import Search from "./Displays/Search";

export default function Company() {
  return (
    <Search
      queryClass="Company"
      chosenLink="/company/chosencompany"
      infoA="shortName"
    />
  );
}
